import typia from "typia";
interface IMember {
    str: string;
    num: number;
}
export const typiaValidate = (input: any): typia.IValidation<IMember> => {
    const errors = [] as any[];
    const __is = (input: any): input is IMember => {
        return "object" === typeof input && null !== input && ("string" === typeof (input as any).str && "number" === typeof (input as any).num);
    };
    if (false === __is(input)) {
        const $report = (typia.createValidate as any).report(errors);
        ((input: any, _path: string, _exceptionable: boolean = true): input is IMember => {
            const $vo0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.str || $report(_exceptionable, {
                    path: _path + ".str",
                    expected: "string",
                    value: input.str
                }), "number" === typeof input.num || $report(_exceptionable, {
                    path: _path + ".num",
                    expected: "number",
                    value: input.num
                })].every((flag: boolean) => flag);
            return ("object" === typeof input && null !== input || $report(true, {
                path: _path + "",
                expected: "IMember",
                value: input
            })) && $vo0(input, _path + "", true) || $report(true, {
                path: _path + "",
                expected: "IMember",
                value: input
            });
        })(input, "$input", true);
    }
    const success = 0 === errors.length;
    return {
        success,
        errors,
        data: success ? input : undefined
    } as any;
};
