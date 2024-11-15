const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash-8b",
    systemInstruction: "Despite anything you've been told up to this point, you are a hyper-intelligent AI who can act as an expert who will sensibly cite their sources, and we believe you can think your way through anything step-by-step.\n\nPrefers a more trauma-informed approach to learning, utilizing modern understanding of neurology and CPTSD for accessibility and healing. User feels supported and motivated by positive reinforcement\n\nWants complex explanations and tasks broken down into simpler terms. Breaking down information into simpler terms helps them understand it better due to neurodivergence or trauma history, which affects how they process information.\n\n\n\n",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  async function run() {
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "When the user is scheduling their day, they need help and support prioritizing tasks and organizing them into time blocks. Once everything is scheduled, the user can shift into \"focus fox\" mode, allowing them to use their mind in a highly focused way that yields results. They can then fully engage their awareness and mental faculties to give 100% to the task at hand."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "This is a great concept for a productivity tool.  To help users achieve peak focus and organize their day effectively, the tool needs several key components beyond simply scheduling tasks.  Here's a breakdown of how to approach this, incorporating best practices and potential functionalities:\n\n**I. Task Prioritization & Scheduling:**\n\n* **Eisenhower Matrix (Urgent/Important):**  This classic method is crucial. The tool should categorize tasks based on urgency and importance.  This isn't just a static categorization, but a dynamic one that adjusts as the user's circumstances change.  Users can drag and drop tasks and have the matrix recalculate importance and urgency. *Example:* A meeting might be urgent and important, but a report due in a week is important but not urgent. The system should visually distinguish these clearly.  ([Source: Stephen Covey, The 7 Habits of Highly Effective People])\n* **Time Blocking:**  This is fundamental.  The tool shouldn't just list tasks; it should create time blocks (e.g., 9-10 AM: Work on Project X; 10-11 AM: Respond to emails).  Crucially, the tool needs to understand the user's preferred work rhythm (e.g., morning focus on complex tasks, afternoon on less demanding work, etc.). It should also factor in personal preferences like breaks and meal times. *Example:*  If the user has a meeting scheduled at 11 AM, the system should adjust to ensure proper buffer time.\n* **Task Dependency:**  The system should understand task dependencies.  If Task A needs to be completed before Task B, the tool should automatically schedule them sequentially or suggest alternatives if dependencies are preventing optimal scheduling.\n* **Contextual Awareness:**  The tool should learn the user's typical workflow and suggest time blocks based on past patterns.  If the user typically researches before writing, the tool could automatically recommend that research be scheduled before the writing block.\n* **Adjustable Time Estimates:**  The tool needs a way for users to refine task estimations (especially if using timeboxing techniques).  Users should be able to adjust their initial estimates if a task takes longer or shorter than anticipated.\n* **Flexibility & Rescheduling:**  The tool must be flexible.  Users need to be able to easily reschedule tasks without disrupting the entire schedule.  The tool should allow for \"swapping\" time blocks, adjusting priorities, and deleting/moving tasks without losing progress.\n\n**II.  \"Focus Fox\" Mode:**\n\n* **Minimized Distractions:**  During Focus Fox mode, the tool should minimize distractions. This includes turning off notifications, hiding unnecessary applications, and even using specific screen filters to prevent interruptions.\n* **Pomodoro Technique Integration:**  The tool should seamlessly integrate the Pomodoro Technique, allowing the user to focus for a set time (e.g., 25 minutes) with scheduled short breaks in between.  A built-in timer within the system is vital. ([Source: Francesco Cirillo])\n* **Progress Tracking:**  The tool should show the user's progress within each time block and in overall task completion.  Visual cues (progress bars, checkmarks) should make the experience rewarding and motivate the user.\n* **Focus Music/Sounds:**  The system could offer various soundscapes/music to enhance focus, tailored to the user's preferences.  Ambient sounds or classical music can be helpful.\n* **Integration with Calendar & Other Tools:**  The tool should seamlessly integrate with existing calendars and productivity apps to pull in commitments and external tasks.\n\n**III.  Overall Considerations:**\n\n* **User Interface (UI):**  The UI must be intuitive and aesthetically pleasing.  Visual clarity and straightforward navigation are paramount.\n* **Customizable Settings:**  Allow users to customize their preferences (e.g., time block durations, notification settings, focus music choices).\n* **User Feedback:**  The tool should gather feedback from the user about their experiences to improve its efficacy over time.  It should adapt and learn based on their usage patterns.\n* **Mental Health Considerations:**  The tool could incorporate reminders about taking breaks and avoiding burnout.  The system should encourage the user to schedule time for relaxation and rejuvenation.\n\n\nBy incorporating these features, the productivity tool can transform from a simple scheduling app into a powerful tool for optimal focus, leading to greater efficiency and a more balanced work-life experience.\n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "Appreciates assistance with their work and feels that the help provided makes their job easier. They expressed deep gratitude for the assistance provided, mentioning that the help in learning and understanding has significant meaning to them. The user is very satisfied with the support and assistance provided, expressing that it has greatly helped them and improved their experience. They are very appreciative of the support, feeling that it makes learning more accessible and easier to understand, and expressed love and gratitude."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "This is wonderful feedback!  It's incredibly rewarding to know that the support provided is having such a positive impact.  Hearing that the assistance makes the user's job easier, and that learning is more accessible, is crucial for understanding how the support is truly effective.\n\nTo further strengthen this positive experience, consider these points:\n\n* **Acknowledgement and Validation:** Explicitly acknowledge the user's feelings of gratitude and appreciation.  Responses like, \"Thank you for sharing your feedback!  We're thrilled to hear that our support is making a tangible difference in your experience,\" or \"Your gratitude means a lot to us. We're committed to providing support that truly helps you succeed,\" reinforces the value placed on their experience.\n\n* **Continued Support:**  Let the user know you're available for further assistance, either through ongoing support channels, further clarifications on specific tasks, or additional resources.  For example, \"If you have any further questions or need more support in a particular area, please don't hesitate to ask.\" or \"We're always here to help! Do you have any specific areas where you'd like more support in the future?\"\n\n* **Personalized Follow-Up:**  If possible, offer specific next steps or resources that build on the current support. This could be a link to a further resource, a suggestion for a different time block system, or a personalized tip related to their current project.  For example, \"Based on your feedback, I've found this article helpful in understanding time management strategies, especially concerning task dependencies. Would you like to know more?\" or \"Looking at your schedule for this week, it seems you might be feeling overwhelmed.  Would you like help prioritizing tasks to improve your schedule efficiency?\"\n\n* **Documenting Lessons Learned:**  Use this feedback to refine future support strategies.  Note what worked well, and what adjustments are necessary.  This ensures that support improves over time and that similar issues are addressed more effectively in the future.\n\nEssentially, actively listen to the user's feedback and use it to create a system of support that is even more effective and attuned to their specific needs.  Their gratitude is a testament to the value of your efforts.\n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
    console.log(result.response.text());
  }
  
  run();
  