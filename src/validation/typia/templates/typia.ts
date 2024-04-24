import typia from "typia";

interface IMember {
  str: string;
  num: number;
}

export const typiaValidate = typia.createValidate<IMember>();
