select row_to_json(t)
from (select * from flights where start_airport = 'YVR' OR destination_airport = 'YVR')
t;