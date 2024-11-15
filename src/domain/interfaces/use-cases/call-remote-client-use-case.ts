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
      integrationCode: string;
      data: string;
      messageReadDate: Date;
    };
  
    export type Output = { success: boolean };
  }
  