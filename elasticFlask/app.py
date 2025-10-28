from flask import Flask, jsonify, request, render_template
from elasticsearch import Elasticsearch

app = Flask(__name__)

es = Elasticsearch(['http://localhost:9200'])
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/test', methods=['GET'])
def test_connection():
    try:
        info = es.info()
        return jsonify({"status": "connected", "info": info})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/api/search', methods=['GET'])
def search():
    # extract data
    index = request.args.get('index')
    keyword = request.args.get('keyword')
    #call es
    query = {
    "query": {
        "query_string": {
            "query": keyword
        }
    }
}
    
    result = es.search(index=index, body=query)
    #return json
    return jsonify(dict(result))
    

@app.route('/api/document', methods=['POST'])
def create():
    # extract data
    data = request.json
    index = data.get('index')
    doc_data = data.get('data')
    doc_id = data.get('docId')
    #call es
    result = es.index(index=index, id=doc_id, document=doc_data)
    return jsonify(dict(result))
    

@app.route('/api/document/<index>/<docId>', methods=['PUT'])
def update(index, docId):
    # extract data
    data = request.json
    doc_data = data.get('data')
    
    #call es
    result = es.update(index=index, id=docId, doc=doc_data)
    #return json
    return (jsonify(dict(result)))

@app.route('/api/delete/<index>/<docId>', methods=['DELETE'])
def delete(index, docId):
    #call es
    result = es.delete(index=index, id=docId)
    #return json
    return (jsonify(dict(result)))
    
if __name__ == '__main__':
    app.run(debug=True)
