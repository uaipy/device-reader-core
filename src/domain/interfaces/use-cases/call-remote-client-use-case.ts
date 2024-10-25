export interface CallRemoteClientUseCase {
    execute(
      data: CallRemoteClientUseCase.Input
    ): Promise<CallRemoteClientUseCase.Output>;
    executeBatch(
      data: CallRemoteClientUseCase.Input[]
    ): Promise<CallRemoteClientUseCase.Output>;
  }
  
  export namespace CallRemoteClientUseCase {
    export type Input = {
      localDeviceId: number;
      messageId: number;
      data: string;
      createdAt: Date;
    };
  
    export type Output = { success: boolean };
  }
  