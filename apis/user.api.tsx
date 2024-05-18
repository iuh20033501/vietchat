import http from "../utils/http";

// Lấy danh sách bạn bè hoặc chặn
// type : {
//     request: danh sách lời mời kết bạn
//     friend: danh sách bạn bè
//     block: danh sách bị chặn
// }
export const getListContactApi = (token, type) =>
  http.get("/v1/users/profile/friends?type=" + type, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// chấp nhận lời mời kết bạn
export const acceptFriendApi = (token, freindId) =>
  http.put(
    `/v1/users/profile/friends/${freindId}/accept`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// từ chối lời mời kết bạn
export const rejectFriendApi = (token, freindId) =>
  http.put(
    `/v1/users/profile/friends/${freindId}/decline`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// chặn bạn bè
export const blockFriendApi = (token, freindId) =>
  http.put(
    `/v1/users/profile/friends/${freindId}/block`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// bỏ chặn bạn bè
export const unBlockFriendApi = (token, freindId) =>
  http.put(
    `/v1/users/profile/friends/${freindId}/unblock`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

// gửi lời mời kết bạn
export const sendFriendRequestApi = (token, freindId) =>
  http.put(
    `/v1/users/profile/friends/${freindId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
// thu hoi
  export const sendRecallFriendApi = (token, freindId) =>
    http.put(
      `/v1/users/profile/friends/${freindId}/cancel`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
//xoa
    export const removeFriendApi = (token, freindId) =>
      http.delete(
        `/v1/users/profile/friends/${freindId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
  