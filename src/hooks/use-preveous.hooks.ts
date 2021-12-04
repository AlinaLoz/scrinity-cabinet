import {useEffect, useRef} from "react";

export default function usePrevious<T>(value: T): T | undefined {
	// Source: https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state
	const ref = useRef<T>();
	
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}
