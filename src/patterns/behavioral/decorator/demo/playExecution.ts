const wait = (delayMs: number) =>
  new Promise<void>(resolve => {
    setTimeout(resolve, delayMs);
  });

export const playExecution = async (
  messages: string[],
  delayMs: number,
  onStep: (message: string) => void,
) => {
  for (let index = 0; index < messages.length; index++) {
    onStep(messages[index]);

    if (index < messages.length - 1) {
      await wait(delayMs);
    }
  }
};
