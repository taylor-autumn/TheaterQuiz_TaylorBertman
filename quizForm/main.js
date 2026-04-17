document.addEventListener('DOMContentLoaded', function () {
    const introPage = document.getElementById('intro-page');
    const quizPage = document.getElementById('quiz-page');
    const page2 = document.getElementById('page-2');
    const page3 = document.getElementById('page-3');
    const page4 = document.getElementById('page-4');
    const page5 = document.getElementById('page-5');
    const startButton = document.getElementById('startButton');
    const quizNextButton = document.getElementById('quizNext');
    const quizForm = document.getElementById('quizForm');
    const page2Form = document.getElementById('page2Form');
    const page2NextButton = document.getElementById('page2Next');
    const page3Form = document.getElementById('page3Form');
    const page3NextButton = document.getElementById('page3Next');
    const page4Form = document.getElementById('page4Form');
    const page4NextButton = document.getElementById('page4Next');
    const resultImage = document.getElementById('resultImage');
    const resultHeading = document.getElementById('resultHeading');
    const resultDescription1 = document.getElementById('resultDescription1');
    const resultDescription2 = document.getElementById('resultDescription2');
    const resultDescription3 = document.getElementById('resultDescription3');
    const restartButton = document.getElementById('restartButton');
    const nextButtons = document.querySelectorAll('.next-page-btn');

    let totalScore = 0;
    let page2Completed = false;

    startButton.addEventListener('click', function () {
        introPage.classList.add('hidden');
        quizPage.classList.remove('hidden');
    });

    quizNextButton.addEventListener('click', function () {
        const formData = new FormData(quizForm);
        const questionNames = ['q1', 'q2', 'q3', 'q4'];

        totalScore = 0;
        let unanswered = [];

        questionNames.forEach((name) => {
            const value = formData.get(name);
            if (value === null) {
                unanswered.push(name);
            } else {
                totalScore += Number(value);
            }
        });

        if (unanswered.length > 0) {
            alert('Please answer all questions before moving to the next page.');
            return;
        }

        quizPage.classList.add('hidden');
        page2.classList.remove('hidden');
    });

    page2NextButton.addEventListener('click', function () {
        const formData = new FormData(page2Form);
        const questionNames = ['q5', 'q6', 'q7'];

        let unanswered = [];
        let page2Score = 0;

        questionNames.forEach((name) => {
            const value = formData.get(name);
            if (!value) {
                unanswered.push(name);
            } else {
                page2Score += Number(value);
            }
        });

        if (unanswered.length > 0) {
            alert('Please select an answer for all drop-down questions before moving to the next page.');
            return;
        }

        if (!page2Completed) {
            totalScore += page2Score;
            page2Completed = true;
        }

        page2.classList.add('hidden');
        page3.classList.remove('hidden');
    });

    page3NextButton.addEventListener('click', function () {
        const formData = new FormData(page3Form);
        const value = formData.get('q8');

        if (!value) {
            alert('Please choose the photo that evokes the most interest before continuing.');
            return;
        }

        totalScore += Number(value);

        page3.classList.add('hidden');
        page4.classList.remove('hidden');
    });

    page4NextButton.addEventListener('click', function () {
        const formData = new FormData(page4Form);
        const value = formData.get('q9');

        if (!value) {
            alert('Please listen to the samples and select the style you like best before continuing.');
            return;
        }

        totalScore += Number(value);

        showResults(totalScore);
        page4.classList.add('hidden');
        page5.classList.remove('hidden');
    });

    restartButton.addEventListener('click', function () {
        location.reload();
    });

    nextButtons.forEach((button) => {
        button.addEventListener('click', function () {
            const currentSection = this.closest('section');
            const nextId = this.dataset.next;
            const nextSection = document.getElementById(nextId);
            if (!nextSection) return;

            if (currentSection) {
                currentSection.classList.add('hidden');
            }
            nextSection.classList.remove('hidden');

            nextSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    function showResults(score) {
        console.log('Quiz total score:', score);
        const results = [
            {
                test: (value) => value <= 50,
                title: 'You like high energy poppy musicals.',
                image: 'photos/quizResults/six.jpg',
                alt: 'Six result image',
                lines: [
                    'You gravitate toward bright, upbeat productions full of catchy songs and lively choreography. This does not necessarily mean that they lack meaning or are unserious, but rather that they use the upbeat vibe and positive energy as a tool to evoke meaning differently than other shows use it.',
                    'High-energy musicals keep you engaged and make the experience feel fun, energetic, and memorable. Some of the most notable examples of this style include Six, Beetlejuice,Mean Girls, Moulin Rouge, &Juliet, Legally Blonde, Mamma Mia, and many more. Additionally, you may like other kinds of live performance such as comedy shows and concerts that have a similar vibe and energy to these musicals.',
                    'This result means you prefer performances that are joyful, vibrant, and full of infectious musical moments. At the same time, you also appreciate the emotional payoff and storytelling that can come with this style, as these shows often balance fun with meaningful themes and character development.'
                ]
            },
            {
                test: (value) => value > 50 && value <= 100,
                title: 'You would like something original and new!',
                image: 'photos/quizResults/hamilton.jpg',
                alt: 'Hamilton result image',
                lines: [
                    'You are drawn to stories and performances that feel fresh, inventive, and boundary-pushing. This may sound fake or a little dramatic, but there have been and always be pieces of theater that break the mold from other conventional shows and set new standards and trends for musicals and shows going forward. Your interest in this stems from your interest/inclination towards improv, creativity, and originality. ',
                    'Some examples of shows that came forward and broke the mold include Hamilton, Stranger Things: Live on Broadway, Heathers: The Musical, Maybe Happy Ending, Two Strangers (Carry a Cake Across New York), and many more. These are all shows with different plot structures, music styles, and theatrical visualizations that changed the game in theater and helped people realize that more could be pursued on the live stage. This could also be forms of performance that are less popular, like improv shows, small comedy sketches, or interactive performance art pieces that blow your mind.',
                    'This result suggests you enjoy art that surprises you and challenges traditional expectations. So before writing off theater, maybe go to your local improv show, or watch one of these shows, if given the change, and try it out! You might be surprised by how much you enjoy it and how it can change your perspective on what theater can be.'
                ]
            },
            {
                test: (value) => value > 100 && value <= 180,
                title: 'You like serious, classic, and dramatic musicals or plays.',
                image: 'photos/quizResults/cabaret.jpg',
                alt: 'Cabaret result image',
                lines: [
                    'You appreciate stories with emotional depth, powerful performances, and classic theatrical themes. These stories are commonly in the form of plays, but many musicals do exist where they leave the priroity of pop and catchy songs behind to prioritize a mood, vibe, time period, and emotional goal that is more catered to the incredibly deep message they are trying to convey.',
                    'Some notable examples of shows like these include Cabaret, Chicago, Les Miserables, Merrily We Roll Along, Rent, Dear Evan Hansen, Next to Normal, and many more. Additionally, you may like other kinds of live performance such as opera and ballet that have a similar vibe and energy to these musicals. Other than musicals, however, there is the very important genre that is plays. Plays are incredibly popular and new ones are created constantly and even studied due to the high emotional depth and powerful messages they can convey. Some examples of plays include The Crucible, A Raisin in the Sun, Death of a Salesman, and many more.',
                    'This result suggests you are drawn to performances that are thought-provoking and richly layered. Try going to a local theater production of a classic play or musical, or even watching one online, to experience the emotional depth and powerful storytelling that this style offers. You might find yourself moved and inspired by the timeless themes and unforgettable performances that these shows provide.'
                ]
            },
            {
                test: (value) => value > 180,
                title: 'You like a good story-driven musical.',
                image: 'photos/quizResults/hadestown.jpg',
                alt: 'Hadestown result image',
                lines: [
                    'You enjoy productions where song, dance, and narrative come together to tell a compelling story. Story-driven musicals often balance strong character arcs with memorable musical moments. Although there are many examples of story-driven musicals, let"s acknowledge that this does not just encompass any kind of musical and call it great, but rather it suggests that a standard musical story arc style would most intrigue you and it is worth digging into some shows and finding exactly what story arc, tropes, or themes you like the most. A lot of the shows in this category also step into history and mythology in order to tell a story that is not only compelling but also has a lot of depth and meaning behind it, which is something you may be drawn to as well.',
                    'Some notable examples of strong story arc musicals are Hadestown, Bonnie & Clyde, Epic, The Last Five Years, Wicked, The Great Gatsby, The Notebook, and many more. It is important to note that shows in the "serious/emotionally intense show" category can also be story-driven, but the other category serves to encompass plays as well, while those who prefer a good story driven musical may not necessarily be drawn to the more serious and intense plays.',
                    'This result means you value a rich theatrical journey with emotional payoff and dramatic storytelling. Once you find a show you like, it is guaranteed you will listen to it so much it will end up on your Spotify Wrapped for the year and you will have to awkwardly explain to your friends why it is there, but hey, no one can blame you for having passion!'
                ]
            }
        ];

        const result = results.find((item) => item.test(score)) || results[2];

        resultHeading.textContent = result.title;
        resultImage.src = result.image;
        resultImage.alt = result.alt;
        resultDescription1.textContent = result.lines[0];
        resultDescription2.textContent = result.lines[1];
        resultDescription3.textContent = result.lines[2];
    }
});