import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment-timezone';
import { RootState } from '../../store';
import { setTimeZone } from '../../store/slices/timeZoneSlice';

const TimeZoneSelector: React.FC = () => {
  const dispatch = useDispatch();
  const timeZone = useSelector((state: RootState) => state.timeZone);

  const handleTimeZoneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setTimeZone(e.target.value));
  };

  const timeZones = moment.tz.names();

  return (
    <div className="my-4 flex flex-col items-start">
      <label htmlFor="timeZone" className="mb-2 text-white font-semibold">
        Time Zone
      </label>
      <select
        id="timeZone"
        value={timeZone.timeZone}
        onChange={handleTimeZoneChange}
        className="p-2 border border-gray-300 rounded text-black bg-white w-64"
      >
        {timeZones.map((zone) => (
          <option key={zone} value={zone}>
            {zone}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeZoneSelector;
