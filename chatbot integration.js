<script>
$(document).ready(function() {
    // Sample bot and user messages
    var botMessages = [
        "Reached megafundland and feeling unfulfilled?",
        "Still think large cap PE is the bee’s knees?",
        "Oof, feels like you're in a crowded trade... (nowadays there are literally thousands of PE folks across BX, Apollo, KKR, Warburg etc... this ain't 2009 no more!)",
        "You’re wrong about that. Join us. You’ll be CEO of one of our sub-holdcos (basically a rollup that we capitalize with $30-50m of long term equity). You’ll have a ton of autonomy. You’ll have a heck of a lot more fun. And base case you’ll have the same net worth creation as your current path over the next ~10 years. And upside case you’ll have much more…",
        "We’re former megafund guys (PE + large tiger cubs) and years ago we started launching holding companies modelled after Berkshire, but pursuing a specific industry or theme. And we’ve gotten good at it. Very good at it. We want to keep launching vehicles but our bottleneck is CEO talent. Specifically, we’re looking for a young high-horsepower CEO like you. We don’t care about operating experience. We just care about work-ethic, integrity, and kindness, and we can teach you how to be the best at the rest of it 😉",
        "Shoot me an email at Let’s (very quietly) catch up to make sure we vibe. We’ll give you more details on how we operate. Then we’ll (very quietly) do a ton of behind-the-scenes reference work (without blowing up your spot). And boom, you come on board with us!",
        // ... add all 10 bot messages here
    ];

    var userMessages = [
        "Yeah, I'm... tired.",
        "Well, if I grind for another 20 years, putting me at 50ish, I think I'll have arrived by then, right?",
        "All fair, but I can't leave, my risk adjusted wealth creation is too much.",
        "Interesting, what are your credentials?",
        "Interesting, what're the next steps?",
        "Sure, thanks!",
        // ... add all 10 user messages here
    ];

    var messageIndex = 0;
    var animationStarted = false; // To ensure the animation only starts once
    function showTypingAndSendMessage() {
    if (messageIndex >= botMessages.length) {
            // All messages have been shown, display the new element with class 'abdul'
            $('.chat-section').append('<div class="cta-show"><a href="mailto:charlie@charlieholdings.com" class="btn-primary-3 accent large w-button">Learn More</a></div>');
            return;
        }
        if (messageIndex >= botMessages.length) return; // Exit if all messages are shown
$('.chat-block-1').append('<img src="https://assets-global.website-files.com/6508761d2177198f72058cc7/650affb32b30d2074126cf40_chat-response-loading.gif" loading="lazy" alt="" class="typing-icon">');

        setTimeout(function() {
         $('.typing-icon').hide();
            // Append bot message and hide typing icon
            $('.chat-block-1').append('<div class="chat-bot-text">' + botMessages[messageIndex] + '</div>');
          
$('.chat-block-2').append('<img src="https://assets-global.website-files.com/6508761d2177198f72058cc7/650affb32b30d2074126cf40_chat-response-loading.gif" loading="lazy" alt="" class="typing-icon">');
            setTimeout(function() {
                setTimeout(function() {
                 $('.typing-icon').hide();
                    // Append user message and hide typing icon
                    $('.chat-block-1').append('<div class="user-text">' + userMessages[messageIndex] + '</div>');
                    messageIndex++; // Move to the next message
                    showTypingAndSendMessage(); // Recursive call to continue the chat flow

                }, 1000); // Delay for user message

            }, 1000); // Delay before showing typing icon for user message

        }, 1000); // Delay for bot message
    }
		$(window).scroll(function() {
        var chatSectionTop = $('.chat-section').offset().top;
        var windowHeight = $(window).height();
        var scrollPos = $(window).scrollTop();

        // Check if the chat section is in the viewport
        if (scrollPos + windowHeight > chatSectionTop && !animationStarted) {
            animationStarted = true;
            showTypingAndSendMessage(); // Start the chat flow
        }

});});
</script>
