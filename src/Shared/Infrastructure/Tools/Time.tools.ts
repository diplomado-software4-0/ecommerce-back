
import { DateFormat } from "@Domain/Enums";
import { TimeBase } from "@SharedDomain/Models";
import moment from "moment";

export class Time implements TimeBase {
	private static _instance: Time;

	private constructor() {}

	public static getInstance(): Time {
		if (!Time._instance) {
			Time._instance = new Time();
		}

		return Time._instance;
	}

	public now(format: DateFormat = DateFormat.DateTime): string {
		return moment().format(format);
	}

	public diffDate(dateOne: string, dateTwo: string): number {
		return moment(dateOne).diff(moment(dateTwo), "days");
	}

	public validateDate(date: string, format: DateFormat): boolean {
		return moment(date, format, true).isValid();
	}

	public format(date: string, format: DateFormat): string {
		return moment(date, true).format(format);
	}
}
