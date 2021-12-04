import useSWR from "swr";
import {CHAT_BY_ID_API, CHATS_API} from "@constants/api.constants";
import {getChatByIdAPI, getChatsAPI} from "@api/chats.service";
import {IChatById} from "@interfaces/chats.interfaces";

export const useChat = (feedbackId: number): [boolean, IChatById[]] => {
	
	const { data, error } = useSWR(
		CHAT_BY_ID_API(feedbackId),
		() => getChatByIdAPI(feedbackId),
	);
	
	const isLoading = !error && !data;
	
	if (error || !data) {
		return [isLoading, []];
	}
	
	return [isLoading, data.items];
};
