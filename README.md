Complete Logstash Demo Setup Guide📋 What This Demo Shows

Logstash receiving logs from 2 different input types (HTTP JSON + TCP text)
Data flowing through Logstash → Elasticsearch → Kibana
Real-time log viewing in Kibana Discover
🚀 Step 1: Start Your Stackbashcd ~/elasticPractice
docker compose up -dWait ~30 seconds for everything to start, then verify:
bashdocker psYou should see 3 containers running:

elasticsearch
kibana
logstash
🔧 Step 2: Setup Kibana Data View (One-Time Setup)Open Kibana:
http://localhost:5601Create Data View:

Click hamburger menu (☰) → Management → Stack Management
Click Data Views (under Kibana section)
Click Create data view
Fill in:

Name: Logstash Logs
Index pattern: logstash-*
Timestamp field: @timestamp


Click Save data view to Kibana
📊 Step 3: Open Discover
Click hamburger menu (☰)
Find Analytics section (top of menu)
Click Discover
Select "Logstash Logs" from dropdown (top-left)
Set time range to "Last 24 hours" (top-right corner)
🎯 Step 4: Send Test Logs (THE DEMO PART!)Open a terminal and run these commands:INPUT 1: HTTP JSON Logs (Simulates API/Application Logs)bash# E-commerce checkout event
curl -XPOST http://localhost:31311 \
  -H "Content-Type: application/json" \
  -d '{"level":"info","message":"User checkout completed","app":"ecommerce","user_id":"12345","amount":99.99}'

# Payment processing
curl -XPOST http://localhost:31311 \
  -H "Content-Type: application/json" \
  -d '{"level":"info","message":"Payment processed","app":"payment-gateway","transaction_id":"txn_abc123","status":"success"}'

# Error event
curl -XPOST http://localhost:31311 \
  -H "Content-Type: application/json" \
  -d '{"level":"error","message":"Database connection timeout","app":"inventory","error_code":"DB_TIMEOUT"}'

# Warning
curl -XPOST http://localhost:31311 \
  -H "Content-Type: application/json" \
  -d '{"level":"warn","message":"High memory usage detected","app":"monitoring","memory_percent":87}'INPUT 2: TCP Plain Text Logs (Simulates Legacy Systems/Syslog)bash# System logs
echo "level=info service=auth message='User login successful' user=john_doe ip=192.168.1.100" | nc localhost 31312

echo "level=warn service=database message='Slow query detected' query_time=5.2s" | nc localhost 31312

echo "level=error service=email message='SMTP server unreachable' smtp_host=mail.example.com" | nc localhost 31312

# Simple plain text
echo "Server backup completed successfully at $(date)" | nc localhost 31312

echo "Disk usage warning: /var partition at 85% capacity" | nc localhost 31312👀 Step 5: View Logs in Kibana
Go back to Kibana Discover tab
Click the Refresh button (circular arrow, top-right)
You should now see all your logs!
Things to Show in Your Demo:A) Filter by Level:

In the search bar, type: level: "error"
Shows only error logs
B) Filter by App:

Search: app: "ecommerce"
Shows only e-commerce logs
C) Search Message Text:

Search: message: *payment*
Shows logs containing "payment"
D) View JSON Fields:

Click the > arrow on any log entry
Click JSON tab to see full document
E) Show Different Sources:

Point out that some logs came from HTTP (JSON) and some from TCP (text)
All unified in one place!