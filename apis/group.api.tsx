import http from "../utils/http";

// tạo nhóm
export const createGroupApi = (token, infoGroup, listItem) => {
  const data = {
    name: infoGroup.name,
    members: listItem,
    thumbnailAvatar: infoGroup.thumbnailAvatar,
  };
  return http.post("/v1/groups", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// lấy danh sách nhóm
export const getListGroupApi = (token) =>
  http.get("/v1/users/profile/groups", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// lấy thông tin nhóm
export const getGroupInfoApi = (token, groupid) => {
  return http.get(`/v1/groups/${groupid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// thêm thành viên vào nhóm
export const addMemberToGroupApi = (token, groupid, listmembers) => {
  return http.put(`/v1/groups/${groupid}/members`, listmembers, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// lấy danh sách thành viên trong nhóm
export const getListMemberInGroupApi = (token, groupid) => {
  return http.get(`/v1/groups/${groupid}/members`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// cập nhật thông tin nhóm
export const updateGroupApi = (token, groupid, infoGroup) => {
  return http.put(
    `/v1/groups/${groupid}`,
    {
      name: infoGroup.name,
      thumbnailAvatar: infoGroup.thumbnailAvatar,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// giaỉ tán nhóm
// Giải tán nhóm. Chức năng này chỉ dành cho nhóm trưởng role="GROUP_LEADER"
export const deleteGroupApi = (token, groupid) => {
  return http.delete(`/v1/groups/${groupid}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// xóa thành viên khỏi nhóm
export const deleteMemberInGroupApi = (token, groupid, memberid) => {
  return http.delete(`/v1/groups/${groupid}/members/${memberid}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const leaveChatGroupApi = (token, groupid) => {
  return http.put(`/v1/users/profile/groups/${groupid}/leave`, {},{
    headers: { Authorization: `Bearer ${token}` },
  });
};


