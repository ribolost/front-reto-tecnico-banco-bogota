import { Command } from './commands/command';

export type ModalOptions = {
  title: string;
  message: string;
  buttonLabel: string;
  commands?: Command[];
};
