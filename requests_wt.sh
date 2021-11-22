for i in {1..10}
do
    echo "Request # $i"
    curl --max-time 5 "http://localhost:3000/wt/100/$i"
done