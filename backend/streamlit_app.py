import streamlit as st 
import requests

st.title("Company Policy Assistant")

if st.button("clear chat history"):
    st.session_state.messages = []
    st.rerun()

if "messages" not in st.session_state: 
    st.session_state.messages = []

for message in st.session_state.messages: 
    with st.chat_message(message["role"]): 
        st.markdown(message["content"]) 
        if "citations" in message and message["citations"]:
            st.info(f"📁 Sources Referenced: {', '.join(message['citations'])}")
if prompt := st.chat_input("Type your question here..."): 
    if prompt.strip():
     st.session_state.messages.append({"role": "user", "content": prompt}) 
    with st.chat_message("user"):
        st.markdown(prompt)
with st.chat_message("assistant"):
    with st.spinner("Thinking..."):
        try:
            api_url = "http://127.0.0.1:8000/api/assistant/ask"
            payload = {"question": str(prompt)}
            response = requests.post(api_url, json=payload)

            if response.status_code == 200:
                data = response.json()
                answer = data.get("answer", "No answer found.")
                citations = data.get("citations", [])

                st.markdown(answer)
                
                if citations:
                    st.info(f"📁 **Sources Referenced:** {', '.join(citations)}")

                st.session_state.messages.append({
                    "role": "assistant", 
                    "content": answer, 
                    "citations": citations
                })
            else:
                st.error(f"Server Error 422 Details: {response.text}")
        except Exception as e:
            st.error(f"Failed to connect to backend: {e}")