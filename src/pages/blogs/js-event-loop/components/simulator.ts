export interface StepSnapshot {
  stepNumber: number;
  title: string;
  description: string;
  currentLine?: number;
  callStack: string[];
  webApis: string[];
  microtaskQueue: string[];
  macrotaskQueue: string[];
  logs: string[];
  highlightSection: 'stack' | 'webapi' | 'microtask' | 'macrotask' | 'console' | null;
}

export function parseAndSimulate(code: string): StepSnapshot[] {
  const steps: StepSnapshot[] = [];
  let stepNumber = 1;

  let callStack: string[] = [];
  let webApis: string[] = [];
  let microtaskQueue: string[] = [];
  let macrotaskQueue: string[] = [];
  let logs: string[] = [];

  const addSnapshot = (
    title: string,
    description: string,
    currentLine?: number,
    highlightSection: StepSnapshot['highlightSection'] = null
  ) => {
    steps.push({
      stepNumber: stepNumber++,
      title,
      description,
      currentLine,
      callStack: [...callStack],
      webApis: [...webApis],
      microtaskQueue: [...microtaskQueue],
      macrotaskQueue: [...macrotaskQueue],
      logs: [...logs],
      highlightSection,
    });
  };

  addSnapshot(
    'Initialization',
    'JavaScript engine parses script. Call Stack, Queues, and Web APIs are ready.',
    1,
    null
  );

  const rawLines = code.split('\n');
  const cleanLines = rawLines.map((l, i) => ({ text: l.trim(), lineNum: i + 1 })).filter(l => l.text.length > 0);

  callStack.push('main()');
  addSnapshot(
    'Main Script Pushed',
    'The global execution context main() is pushed onto the Call Stack.',
    cleanLines[0]?.lineNum || 1,
    'stack'
  );

  const pendingMicrotasks: Array<{ name: string; action: () => void; line: number }> = [];
  const pendingMacrotasks: Array<{ name: string; action: () => void; line: number }> = [];

  const executeLine = (lineText: string, lineNum: number) => {
    if (lineText.includes('console.log')) {
      const match = lineText.match(/console\.log\((.*)\)/);
      const val = match ? match[1].replace(/['"`]/g, '').trim() : 'log';
      const frameName = `console.log(${val})`;

      callStack.push(frameName);
      addSnapshot(
        `Execute ${frameName}`,
        `${frameName} is pushed to Call Stack to execute synchronously.`,
        lineNum,
        'stack'
      );

      logs.push(val);
      addSnapshot(
        `Print to Console`,
        `Printed "${val}" to Console Output.`,
        lineNum,
        'console'
      );

      callStack.pop();
      addSnapshot(
        `Pop ${frameName}`,
        `${frameName} completed and is popped from the Call Stack.`,
        lineNum,
        'stack'
      );
    } else if (lineText.includes('setTimeout')) {
      const match = lineText.match(/setTimeout\((.*),\s*(\d+)?\)/);
      const delay = match && match[2] ? match[2] : '0';
      const innerMatch = lineText.match(/console\.log\((.*)\)/);
      const innerVal = innerMatch ? innerMatch[1].replace(/['"`]/g, '').trim() : 'timeout callback';
      const cbName = `timeoutCallback("${innerVal}")`;

      callStack.push(`setTimeout(..., ${delay}ms)`);
      addSnapshot(
        'Call setTimeout()',
        `setTimeout is pushed to Call Stack. It is a Web API provided by the browser runtime, not ECMAScript itself.`,
        lineNum,
        'stack'
      );

      webApis.push(`Timer (${delay}ms) -> ${cbName}`);
      addSnapshot(
        'Register in Web APIs',
        `Timer registered in Web APIs container. It counts down ${delay}ms in the background.`,
        lineNum,
        'webapi'
      );

      callStack.pop();
      addSnapshot(
        'Pop setTimeout()',
        `setTimeout completed registration and is popped from the Call Stack. Synchronous execution continues.`,
        lineNum,
        'stack'
      );

      webApis = webApis.filter(w => !w.includes(cbName));
      macrotaskQueue.push(cbName);
      addSnapshot(
        'Timer Expired -> Macrotask Queue',
        `Timer for ${cbName} completed and its callback is pushed to the Macrotask (Task) Queue.`,
        lineNum,
        'macrotask'
      );

      pendingMacrotasks.push({
        name: cbName,
        line: lineNum,
        action: () => {
          logs.push(innerVal);
        }
      });
    } else if (lineText.includes('Promise.resolve') || lineText.includes('.then') || lineText.includes('queueMicrotask')) {
      const innerMatch = lineText.match(/console\.log\((.*)\)/);
      const innerVal = innerMatch ? innerMatch[1].replace(/['"`]/g, '').trim() : 'promise callback';
      const cbName = `promiseThen("${innerVal}")`;

      callStack.push('Promise.resolve().then(...)');
      addSnapshot(
        'Execute Promise.resolve()',
        `Promise resolves immediately on Call Stack. The attached .then() callback is scheduled.`,
        lineNum,
        'stack'
      );

      microtaskQueue.push(cbName);
      addSnapshot(
        'Enqueued in Microtask Queue',
        `${cbName} is pushed to the high-priority Microtask Queue (Jobs queue).`,
        lineNum,
        'microtask'
      );

      callStack.pop();
      addSnapshot(
        'Pop Promise.resolve()',
        `Promise.resolve() is popped from Call Stack.`,
        lineNum,
        'stack'
      );

      pendingMicrotasks.push({
        name: cbName,
        line: lineNum,
        action: () => {
          logs.push(innerVal);
        }
      });
    }
  };

  cleanLines.forEach((item) => {
    executeLine(item.text, item.lineNum);
  });

  callStack = callStack.filter(f => f !== 'main()');
  addSnapshot(
    'Main Script Execution Finished',
    'Call Stack is now completely empty! The Event Loop wakes up to inspect queues.',
    undefined,
    'stack'
  );

  while (pendingMicrotasks.length > 0) {
    const task = pendingMicrotasks.shift()!;
    microtaskQueue = microtaskQueue.filter(m => m !== task.name);
    addSnapshot(
      `Event Loop: Dequeue Microtask`,
      `Event Loop checks Microtask Queue first. Draining ${task.name}.`,
      task.line,
      'microtask'
    );

    callStack.push(task.name);
    addSnapshot(
      `Push ${task.name} to Call Stack`,
      `${task.name} moved from Microtask Queue to Call Stack to execute.`,
      task.line,
      'stack'
    );

    task.action();
    addSnapshot(
      `Execute ${task.name}`,
      `Callback executed, logging to Console Output.`,
      task.line,
      'console'
    );

    callStack.pop();
    addSnapshot(
      `Pop ${task.name}`,
      `${task.name} finished and popped from Call Stack.`,
      task.line,
      'stack'
    );
  }

  addSnapshot(
    'Microtask Queue Drained',
    'All microtasks are completed. Now Event Loop is allowed to take ONE task from Macrotask Queue.',
    undefined,
    'macrotask'
  );

  while (pendingMacrotasks.length > 0) {
    const task = pendingMacrotasks.shift()!;
    macrotaskQueue = macrotaskQueue.filter(m => m !== task.name);
    addSnapshot(
      `Event Loop: Dequeue Macrotask`,
      `Event Loop picks ${task.name} from Macrotask Queue.`,
      task.line,
      'macrotask'
    );

    callStack.push(task.name);
    addSnapshot(
      `Push ${task.name} to Call Stack`,
      `${task.name} moved to Call Stack to execute.`,
      task.line,
      'stack'
    );

    task.action();
    addSnapshot(
      `Execute ${task.name}`,
      `Macrotask executed, logging output.`,
      task.line,
      'console'
    );

    callStack.pop();
    addSnapshot(
      `Pop ${task.name}`,
      `${task.name} finished and popped from Call Stack.`,
      task.line,
      'stack'
    );
  }

  addSnapshot(
    'Execution Completed',
    'Call Stack, Microtask Queue, and Task Queue are all empty. Program terminated.',
    undefined,
    null
  );

  return steps;
}
