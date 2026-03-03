import streamlit as st
import pandas as pd
import plotly.express as px

# --- APP CONFIGURATION ---
st.set_page_config(page_title="Centric: AI Self-Care Companion", layout="wide")

# --- DATA (Extracted from Centric-V2/src/data/curriculum.ts) ---
PILLARS = [
    "Physical Health",
    "Mental & Emotional Health",
    "Spiritual Formation",
    "Relationships & Social Life",
    "Career & Work",
    "Finances"
]

# Sample data mapping based on your curriculum file
CURRICULUM_DATA = {
    "Physical Health": {
        "questions": ["How rested do you feel today?", "Have you moved your body in a way that felt good recently?"],
        "challenges": ["Take a 15-minute walk without your phone.", "Try a 5-minute stretching routine before bed."]
    },
    "Mental & Emotional Health": {
        "questions": ["What is one emotion you've been avoiding?", "How would you describe your internal monologue today?"],
        "challenges": ["Journal for 10 minutes about your wins this week.", "Practice a box-breathing exercise for 2 minutes."]
    },
    "Spiritual Formation": {
        "questions": ["When did you last feel a sense of peace?", "What are you currently grateful for?"],
        "challenges": ["Spend 10 minutes in silent meditation.", "Read a passage that inspires you."]
    },
    "Relationships & Social Life": {
        "questions": ["Who makes you feel seen and heard?", "Is there a boundary you need to set?"],
        "challenges": ["Send a 'thinking of you' text to a friend.", "Schedule a coffee date with a loved one."]
    },
    "Career & Work": {
        "questions": ["Does your current work align with your values?", "What is one professional boundary you maintained today?"],
        "challenges": ["Clear your desk of all unnecessary clutter.", "Identify one task you can delegate or say no to."]
    },
    "Finances": {
        "questions": ["How do you feel when you look at your bank account?", "What is one financial goal for this month?"],
        "challenges": ["Review your subscriptions and cancel one you don't use.", "Track every expense for the next 24 hours."]
    }
}

# --- APP LOGIC ---
st.title("🌿 Centric: AI Self-Care Companion")

# 1. Onboarding
if 'user_name' not in st.session_state:
    with st.container():
        st.subheader("Welcome to Centric")
        st.write("A safe space for those who care for others.")
        name = st.text_input("Before we begin, how should I address you?")
        if st.button("Begin Journey"):
            if name:
                st.session_state.user_name = name
                st.rerun()
            else:
                st.warning("Please enter your name to continue.")
else:
    st.sidebar.write(f"Logged in as: **{st.session_state.user_name}**")
    if st.sidebar.button("Reset Session"):
        del st.session_state.user_name
        st.rerun()

    # 2. Wheel of Life Scenario
    st.header(f"Hello, {st.session_state.user_name}. Let's check in.")
    st.write("Rate your current satisfaction in each area of your life (1-10):")
    
    cols = st.columns(3)
    scores = {}
    for i, pillar in enumerate(PILLARS):
        with cols[i % 3]:
            scores[pillar] = st.slider(pillar, 1, 10, 5)

    # 3. Visualize the Wheel
    df = pd.DataFrame(dict(r=list(scores.values()), theta=list(scores.keys())))
    fig = px.line_polar(df, r='r', theta='theta', line_close=True, range_r=[0,10], color_discrete_sequence=["#2E7D32"])
    fig.update_traces(fill='toself')
    st.plotly_chart(fig)

    # 4. Weekly Challenges Transition
    lowest_pillar = min(scores, key=scores.get)
    st.divider()
    st.header("✨ Your Weekly Focus")
    st.write(f"Based on your check-in, let's focus on **{lowest_pillar}** this week.")

    col_q, col_c = st.columns(2)
    
    with col_q:
        st.subheader("Reflection Questions")
        for q in CURRICULUM_DATA[lowest_pillar]["questions"]:
            st.info(q)
            
    with col_c:
        st.subheader("Weekly Challenges")
        for c in CURRICULUM_DATA[lowest_pillar]["challenges"]:
            st.success(c)