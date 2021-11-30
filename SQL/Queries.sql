select *
from account
where upper(first_name) like upper('%%')

select * from book natural join writes natural join author