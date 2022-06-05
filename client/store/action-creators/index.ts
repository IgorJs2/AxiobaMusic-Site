import * as PlayerActionCreators from "../action-creators/player"
import * as UserActionCreators from "../action-creators/user"


export default {
    ...PlayerActionCreators,
    ...UserActionCreators
}