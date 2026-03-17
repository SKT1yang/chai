import { ISettableObservable } from '../base'
import { EqualityComparer, strictEquals } from '../commonFacade/deps'
import { DebugLocation } from '../debugLocation'
import { DebugNameData, IDebugNameData } from '../debugName'
import { LazyObservableValue } from './lazyObservableValue'
import { ObservableValue } from './observableValue'

export function observableValueOpts<T, TChange = void>(
	options: IDebugNameData & {
		equalsFn?: EqualityComparer<T>
		lazy?: boolean
	},
	initialValue: T,
	debugLocation = DebugLocation.ofCaller(),
): ISettableObservable<T, TChange> {
	if (options.lazy) {
		return new LazyObservableValue(
			new DebugNameData(options.owner, options.debugName, undefined),
			initialValue,
			options.equalsFn ?? strictEquals,
			debugLocation,
		)
	}
	return new ObservableValue(
		new DebugNameData(options.owner, options.debugName, undefined),
		initialValue,
		options.equalsFn ?? strictEquals,
		debugLocation,
	)
}
