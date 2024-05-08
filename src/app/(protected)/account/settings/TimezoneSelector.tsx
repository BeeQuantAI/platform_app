import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_TIMEZONES, UPDATE_TIMEZONE } from '@/graphql/user';
import { ITimezone } from 'interfaces/ITimezone';

interface Props {
  initialTimezone?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  userId: string;
}

const TimezoneSelector: React.FC<Props> = ({ initialTimezone, userId }) => {
  const { loading, error, data } = useQuery<{ getTimezones: ITimezone[] }>(GET_TIMEZONES);
  const [updateTimezone] = useMutation(UPDATE_TIMEZONE);
  const [selectedTimezone, setSelectedTimezone] = useState<string>(initialTimezone || '');

  const handleTimezoneChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTimezone = event.target.value;
    setSelectedTimezone(newTimezone);
    const response = await updateTimezone({ variables: { userId, timezone: newTimezone } });
    if (response.data.updateTimezone.success) {
      window.location.reload(); // Refresh page
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <select value={selectedTimezone} onChange={handleTimezoneChange}>
      {data &&
        data.getTimezones.map((tz: ITimezone) => (
          <option key={tz.id} value={tz.id}>
            {tz.displayName}
          </option>
        ))}
    </select>
  );
};

export default TimezoneSelector;
