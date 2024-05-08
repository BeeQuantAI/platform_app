import { useQuery, useMutation } from '@apollo/client';
import { GET_TIMEZONES, UPDATE_TIMEZONE } from '@/graphql/timezone';

export const useTimezoneManagement = (userId: any) => {
  // 获取时区列表
  const { data: timezonesData, loading: timezonesLoading } = useQuery(GET_TIMEZONES);

  // 更新用户时区
  const [updateTimezone, { loading: updatingTimezone }] = useMutation(UPDATE_TIMEZONE);

  const handleTimezoneChange = async (newTimezone: any) => {
    try {
      const response = await updateTimezone({
        variables: { userId, timezone: newTimezone },
      });
      if (response.data.updateTimezone.success) {
        // 可以在这里进行页面更新或显示消息
        console.log('Timezone updated:', response.data.updateTimezone.message);
      } else {
        console.error('Failed to update timezone:', response.data.updateTimezone.message);
      }
    } catch (error) {
      console.error('Error updating timezone:', error);
    }
  };

  return {
    timezones: timezonesData?.getTimezones,
    handleTimezoneChange,
    timezonesLoading,
    updatingTimezone,
  };
};
