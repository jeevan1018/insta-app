import { userGetUSer } from '.user/state';
import { useMemo } from 'react';
const useCombineState = () => {
	// Call all hooks at the top level
	const userInfo = useGetUser();
	// Only memoize the final combined object
	return useMemo(
		() => ({
			userInfo
		}),
		[
			userInfo
		],
	);
};

export default useCombineState;