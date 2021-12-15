export interface Confirm {
  /**
   * @RegEx \@"^\d{11}$" (the first backslash is an escape)
   * @StringLength 60
   */
  telNo: string;
  /** 
  * @Rrequired 
  */
  auth: string;
}