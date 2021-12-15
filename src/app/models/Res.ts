export interface Res<Value> {
  isSuccess: boolean;
  message: string;
  value: Value;
}

export function isResVaild(res: Res<any>) {

  return res.isSuccess;

}