import { ActionType } from "../action-types";
import { NftData } from "../../type";




interface ApproveNftAction {
  type: ActionType.APPROVE_NFT;
  payload: number;
}
interface ApproveTokenAction {
  type: ActionType.APPROVE_TOKEN;
  payload: number;
}
interface FetchNftAction {
  type: ActionType.FETCH_LISTED_NFTS | ActionType.FETCH_USERS_NFTS;
  payload: NftData[];
}
interface ChangeBirdCharacterAction {
  type: ActionType.SET_BIRD_SKIN;
  payload: 'red' | 'yellow' | 'blue';
}

export type Action = ApproveNftAction | ApproveTokenAction | FetchNftAction|ChangeBirdCharacterAction;;
