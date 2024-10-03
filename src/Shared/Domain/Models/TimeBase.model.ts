import { DateFormat } from "@Domain/Enums";

export interface TimeBase {
	now: (format?: DateFormat) => string;
	diffDate: (dateOne: string, dateTwo: string) => number;
	validateDate: (date: string, format: DateFormat) => boolean;
	format: (date: string, format: DateFormat) => string;
}
