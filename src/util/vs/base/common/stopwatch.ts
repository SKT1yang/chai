export class StopWatch {
	private _startTime: number;
	private _stopTime: number;

	private readonly _now: () => number;

	public static create(): StopWatch {
		return new StopWatch();
	}

	constructor() {
		this._now = Date.now;
		this._startTime = this._now();
		this._stopTime = -1;
	}

	public stop(): void {
		this._stopTime = this._now();
	}

	public reset(): void {
		this._startTime = this._now();
		this._stopTime = -1;
	}

	public elapsed(): number {
		if (this._stopTime !== -1) {
			return this._stopTime - this._startTime;
		}
		return this._now() - this._startTime;
	}
}
