import parcelAPI from "@/service/parcelAPI.js";

const state = {
  notifications: []
};

const mutations = {
  setNotifications(state, notifications) {
    state.notifications = notifications;
  }
};

const actions = {
  async fetchNotifications({commit}) {
    try {
      const notifications = await parcelAPI.fetchNotifications();
      commit('setNotifications', notifications.data);
    } catch (error) {
      console.error('택배 알림 목록을 불러오는 데 실패했습니다:', error);
      throw error;
    }
  },
  async createNotification({commit, dispatch}, notification) {
    try {
      await parcelAPI.createNotification(notification);
      console.log('택배 알림이 생성되었습니다.');
      commit('modalStore/setShowModal', false, {root: true}); // 모달 닫기
      await dispatch('fetchNotifications');
    } catch (error) {
      console.error('택배 알림 생성에 실패했습니다:', error);
      alert('올바른 운송장 정보를 입력하세요.');
      throw error;
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};