export interface Signup {
  /** 
   * @Rrequired
   * @StringLength 60
   */
  fullName: string;
  /**
   * @RegEx \@"^\d{11}$" (the first backslash is an escape)
   * @StringLength 60
   */
  telNo: string;
  /** 
  * @StringLength 300
  */
  bio?: string;
  /** 
   * @Rrequired 
   * @MinLength 4
   */
  password: string;
  auth?: string
}