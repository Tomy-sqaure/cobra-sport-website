document.addEventListener('DOMContentLoaded', function () {
    const options = document.querySelectorAll('.option');
    const submitButton = document.querySelector('.submit-quiz');
    const questions = document.querySelectorAll('.quiz-question');
    //const nextQuestButton = document.querySelector('.Next-quest');
    const tryAgainButton = document.querySelectorAll('button');
    const nextButton = document.createElement('button');
    nextButton.className = 'next-question';
    nextButton.textContent = 'Soal Berikutnya';
    
    let currentQuestion = 0;
    let usedQuestions = new Set(); // Untuk melacak soal yang sudah muncul
    
    // Sembunyikan semua pertanyaan kecuali yang pertama
    questions.forEach(q => q.style.display = 'none');
    questions[0].style.display = 'block';

    // Sembunyikan tombol submit di awal
    submitButton.style.display = 'none';

    // Data soal dan jawaban
    const quizData = [
        {
            question: "Apa arti dari kata \"Islam\"?",
            answers: [
                { text: "Keselamatan", isCorrect: false },
                { text: "Kedamaian", isCorrect: false },
                { text: "Ketaatan", isCorrect: false },
                { text: "Semua benar", isCorrect: true }
            ]
        },
        {
            question: "Berapa jumlah rukun Islam?",
            answers: [
                { text: "3", isCorrect: false },
                { text: "4", isCorrect: false },
                { text: "5", isCorrect: true },
                { text: "6", isCorrect: false }
            ]
        },
        {
            question: "Siapa nabi pertama dalam Islam?",
            answers: [
                { text: "Nabi Muhammad SAW", isCorrect: false },
                { text: "Nabi Ibrahim AS", isCorrect: false },
                { text: "Nabi Adam AS", isCorrect: true },
                { text: "Nabi Nuh AS", isCorrect: false }
            ]
        },
        {
            question: "Kitab suci umat Islam adalah?",
            answers: [
                { text: "Zabur", isCorrect: false },
                { text: "Taurat", isCorrect: false },
                { text: "Injil", isCorrect: true },
                { text: "Al-Qur'an", isCorrect: false }
            ]
        },
        {
            question: "Berapa jumlah rakaat shalat Maghrib?",
            answers: [
                { text: "3", isCorrect: true },
                { text: "4", isCorrect: false },
                { text: "5", isCorrect: false },
                { text: "6", isCorrect: false }
            ]
        },
        {
            question: "Apa nama bulan puasa dalam Islam?",
            answers: [
                { text: "Syawal", isCorrect: false },
                { text: "Rajab", isCorrect: false },
                { text: "Ramadhan", isCorrect: true },
                { text: "Sya'ban", isCorrect: false }
            ]
        },
        {
            question: " Berapa kali minimal membaca Al-Qur'an dalam sehari?",
            answers: [
                { text: "1 Halaman", isCorrect: false },
                { text: "1 Juz", isCorrect: true },
                { text: "Tidak ada batasan minimal", isCorrect: false },
                { text: "5 Ayat", isCorrect: false }
            ]
        },
        {
            question: "Apa arti dari \"Alhamdulillah\"?",
            answers: [
                { text: "Semoga Allah memberkati", isCorrect: true },
                { text: "Segala puji bagi Allah", isCorrect: false },
                { text: "Allah Maha Besar", isCorrect: false },
                { text: "Dengan nama Allah", isCorrect: false }
            ]
        },
        {
            question: "Berapa jumlah malaikat yang wajib diketahui?",
            answers: [
                { text: "7", isCorrect: false },
                { text: "12", isCorrect: false },
                { text: "10", isCorrect: true },
                { text: "9", isCorrect: false }
            ]
        },
        {
            question: "Siapa khalifah pertama dalam Islam?",
            answers: [
                { text: "Abu Bakar As-Siddiq", isCorrect: true },
                { text: "Umar bin Khattab", isCorrect: false },
                { text: "Utsman bin Affan", isCorrect: false },
                { text: "Ali bin Abi Thalib", isCorrect: false }
            ]
        },
        // ... tambahkan data soal lainnya dengan format yang sama
    ];

    // Tambahkan data untuk quest kedua
    const quizDataAdvanced = [
        {
            question: "Dari surat apakah ayat berikut: \"Bismillahir rahmanir rahim\"?",
            answers: [
                { text: "Al-Fatihah", isCorrect: true },
                { text: "Al-Ikhlas", isCorrect: false },
                { text: "An-Nas", isCorrect: false },
                { text: "Al-Falaq", isCorrect: false }
            ]
        },
        {
            question: "Apa arti dari surat An-Nas?",
            answers: [
                { text: "Waktu", isCorrect: false },
                { text: "Manusia", isCorrect: true },
                { text: "Fajar", isCorrect: false },
                { text: "Keikhlasan", isCorrect: false }
            ]
        },
        {
            question: "Dalam kitab Jurumiyah, ada berapa pembagian I'rob?",
            answers: [
                { text: "2", isCorrect: false },
                { text: "3", isCorrect: false },
                { text: "4", isCorrect: true },
                { text: "5", isCorrect: false }
            ]
        },
        {
            question: "Dalam kitab Safinatun Najah, apa syarat sah sholat yang pertama?",
            answers: [
                { text: "Menutup Aurat", isCorrect: false },
                { text: "Suci dari hadats", isCorrect: true },
                { text: "Menghadap kiblat", isCorrect: false },
                { text: "Masuk waktu sholat", isCorrect: false }
            ]
        },
        {
            question: "Dalam ilmu Fiqih, apa hukum mengqodho puasa Ramadhan yang tertinggal?",
            answers: [
                { text: "Sunnah", isCorrect: false },
                { text: "Makruh", isCorrect: false },
                { text: "Mubah", isCorrect: false },
                { text: "Wajib", isCorrect: true }
            ]
        },
        {
            question: "Ayat \"Qul huwallahu ahad\" diambil dari surat?",
            answers: [
                { text: "Al-Ikhlas", isCorrect: true },
                { text: "An-Nas", isCorrect: false },
                { text: "Al-Falaq", isCorrect: false },
                { text: "Al-Kafirun", isCorrect: false }
            ]
        },
        {
            question: "Dalam kitab Jurumiyah, apa yang dimaksud dengan Kalam?",
            answers: [
                { text: "Huruf yang bermakna", isCorrect: false },
                { text: "Lafadz yang tersusun", isCorrect: false },
                { text: "Lafadz yang bermakna dengan susunan yang disengaja", isCorrect: true },
                { text: "Kata yang memiliki arti", isCorrect: false }
            ]
        },
        {
            question: "Menurut kitab Safinatun Najah, ada berapa syarat wajib sholat?",
            answers: [
                { text: "5", isCorrect: false },
                { text: "6", isCorrect: false },
                { text: "7", isCorrect: true },
                { text: "8", isCorrect: false }
            ]
        },
        {
            question: "Dalam ilmu Fiqih, apa hukum membaca Al-Fatihah dalam sholat?",
            answers: [
                { text: "Sunnah", isCorrect: false },
                { text: "Rukun", isCorrect: true },
                { text: "Wajib", isCorrect: false },
                { text: "Mubah", isCorrect: false }
            ]
        },
        {
            question: "Ayat terakhir dari surat Al-Fatihah adalah?",
            answers: [
                { text: "Waladdhollin", isCorrect: true },
                { text: "Al-Mustaqim", isCorrect: false },
                { text: "Maliki Yaumiddin", isCorrect: false },
                { text: "An'amta alaihim", isCorrect: false }
            ]
        },
        {
            question: "Dalam kitab Jurumiyah, termasuk tanda-tanda isim adalah?",
            answers: [
                { text: "Bisa dimasuki huruf jar", isCorrect: true },
                { text: "Bisa dimasuki 'amil jazm", isCorrect: false },
                { text: "Bisa dimasuki qad", isCorrect: false },
                { text: "Bisa dimasuki sin-saufa", isCorrect: false }
            ]
        },
        {
            question: "Menurut Safinatun Najah, apa yang membatalkan wudhu?",
            answers: [
                { text: "Makan", isCorrect: false },
                { text: "Berbicara", isCorrect: false },
                { text: "Keluar sesuatu dari dua jalan", isCorrect: true },
                { text: "Bergerak", isCorrect: false }
            ]
        },
        {
            question: "Dalam Fiqih, kapan waktu yang diharamkan untuk sholat?",
            answers: [
                { text: "Setelah Subuh hingga terbit matahari", isCorrect: true },
                { text: "Setelah Ashar", isCorrect: false },
                { text: "Setelah Maghrib", isCorrect: false },
                { text: "Tengah malam", isCorrect: false }
            ]
        },
        {
            question: "Apa arti dari \"Alhamdulillahi Rabbil 'Alamin\"?",
            answers: [
                { text: "Dengan nama Allah", isCorrect: false },
                { text: "Segala puji bagi Allah Tuhan semesta alam", isCorrect: true },
                { text: "Maha suci Allah", isCorrect: false },
                { text: "Allah Maha Besar", isCorrect: false }
            ]
        },
        {
            question: "Dalam kitab Jurumiyah, apa yang dimaksud dengan I'rob?",
            answers: [
                { text: "Perubahan akhir kata", isCorrect: true },
                { text: "Perubahan awal kata", isCorrect: false },
                { text: "Perubahan tengah kata", isCorrect: false },
                { text: "Perubahan seluruh kata", isCorrect: false }
            ]
        }
    ];

    // Fungsi untuk mengacak array
    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // Acak urutan soal
    const questionOrder = shuffleArray([...Array(questions.length).keys()]);

    // Fungsi untuk mengacak jawaban dengan mempertahankan format ABCD
    function shuffleAnswers(question) {
        const answers = question.querySelectorAll('.option');
        const answerTexts = Array.from(answers).map(a => a.textContent.substring(3)); // Hapus "A. ", "B. " dll
        const shuffledTexts = shuffleArray(answerTexts);
        
        answers.forEach((answer, index) => {
            const letter = String.fromCharCode(65 + index); // A, B, C, D
            answer.textContent = `${letter}. ${shuffledTexts[index]}`;
        });
    }

    // Fungsi untuk menampilkan soal
    function showQuestion(index) {
        questions.forEach(q => q.style.display = 'none');
        const currentQuestionElement = questions[questionOrder[index]];
        currentQuestionElement.style.display = 'block';
        
        // Acak jawaban jika belum pernah ditampilkan
        if (!usedQuestions.has(questionOrder[index])) {
            shuffleAnswers(currentQuestionElement);
            usedQuestions.add(questionOrder[index]);
        }
        
        const questionTitle = currentQuestionElement.querySelector('h3');
        questionTitle.textContent = `Pertanyaan ${index + 1}`;
        
        if(index === questions.length - 1) {
            nextButton.style.display = 'none';
            submitButton.style.display = 'block';
        } else {
            nextButton.style.display = 'block';
            submitButton.style.display = 'none';
        }
    }

    // Event listener untuk pilihan jawaban
    questions.forEach(question => {
        const optionButtons = question.querySelectorAll('.option');
        optionButtons.forEach(button => {
            button.addEventListener('click', function () {
                // Hapus selected dari semua opsi dalam pertanyaan yang sama
                optionButtons.forEach(btn => btn.classList.remove('selected'));
                // Tambahkan selected ke opsi yang diklik
                this.classList.add('selected');
                
                // Tampilkan tombol next jika bukan pertanyaan terakhir
                if (currentQuestion < questions.length - 1) {
                    if (!question.contains(nextButton)) {
                        question.appendChild(nextButton);
                    }
                }
            });
        });
    });

    nextButton.addEventListener('click', function () {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    });

    submitButton.addEventListener('click', function () {
        let quest1Score = 0;
        
        // Sembunyikan semua soal
        const quizContainer = document.querySelector('.quiz-container');
        quizContainer.style.display = 'none';

        questions.forEach((question) => {
            const selectedOption = question.querySelector('.option.selected');
            if (selectedOption) {
                const questionText = question.querySelector('.question-text').textContent.trim();
                const selectedText = selectedOption.textContent.substring(3).trim();
                
                const questionData = quizData.find(q => q.question.trim() === questionText);
                if (questionData) {
                    const isCorrect = questionData.answers.find(a => a.text === selectedText && a.isCorrect);
                    if (isCorrect) {
                        quest1Score++;
                    }
                }
            }
        });

        // Tampilkan hasil Quest 1
        const submitResult = document.querySelector('.submit-result');
        const quest1ScoreElement = submitResult.querySelector('.quest1-score');
        const resultMessage = submitResult.querySelector('.result-message');
        
        quest1ScoreElement.textContent = quest1Score;
        resultMessage.innerHTML = '';
        
        let message = '';
        let showNextQuestButton = false;

        if (quest1Score === 10) {
            message = 'Sempurna! Anda siap untuk Quest lanjutan!';
            showNextQuestButton = true;
        } else if (quest1Score >= 8) {
            message = 'Bagus! Anda bisa mencoba Quest lanjutan!';
            showNextQuestButton = true;
        } else if (quest1Score >= 5) {
            message = 'Cukup baik, tetapi perlu belajar lagi sebelum ke Quest lanjutan.';
        } else {
            message = 'Sebaiknya pelajari lagi materi dasar sebelum melanjutkan.';
        }

        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        resultMessage.appendChild(messageElement);

        // Tambahkan tombol berdasarkan skor
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'button-container';

        const tryAgainButton = document.createElement('button');
        tryAgainButton.className = 'try-again';
        tryAgainButton.textContent = 'Coba Lagi';
        buttonContainer.appendChild(tryAgainButton);

        if (showNextQuestButton) {
            const nextQuestButton = document.createElement('button');
            nextQuestButton.className = 'next-quest';
            nextQuestButton.textContent = 'Lanjut Quest 2';
            buttonContainer.appendChild(nextQuestButton);

            nextQuestButton.addEventListener('click', function() {
                startAdvancedQuest();
            });
        }

        resultMessage.appendChild(buttonContainer);

        tryAgainButton.addEventListener('click', function() {
            location.reload();
        });

        submitResult.style.display = 'block';
    });

    // Fungsi untuk memulai quest lanjutan
    function startAdvancedQuest() {
        // Reset tampilan
        const quizContainer = document.querySelector('.quiz-container');
        const submitResult = document.querySelector('.submit-result');
        submitResult.style.display = 'none';
        
        // Reset container
        quizContainer.innerHTML = '<h1>Quest 2: Pengetahuan Islam Lanjutan</h1>';
        
        // Buat dan tambahkan semua pertanyaan
        quizDataAdvanced.forEach((questionData, index) => {
            const questionElement = createQuestionElement(questionData, index);
            questionElement.style.display = 'none'; // Sembunyikan semua pertanyaan
            quizContainer.appendChild(questionElement);
        });

        // Tampilkan pertanyaan pertama
        const firstQuestion = quizContainer.querySelector('.quiz-question');
        if (firstQuestion) {
            firstQuestion.style.display = 'block';
        }

        // Tambahkan tombol next untuk navigasi
        const nextButton = document.createElement('button');
        nextButton.className = 'next-question';
        nextButton.textContent = 'Soal Berikutnya';
        
        // Tambahkan tombol submit (tersembunyi di awal)
        const submitButton = document.createElement('button');
        submitButton.className = 'submit-quiz';
        submitButton.textContent = 'Submit Jawaban';
        submitButton.style.display = 'none';
        quizContainer.appendChild(submitButton);

        let currentQuestionIndex = 0;
        const questions = quizContainer.querySelectorAll('.quiz-question');

        // Event listener untuk tombol next
        nextButton.addEventListener('click', function() {
            if (currentQuestionIndex < questions.length - 1) {
                questions[currentQuestionIndex].style.display = 'none';
                currentQuestionIndex++;
                questions[currentQuestionIndex].style.display = 'block';
                
                // Tampilkan tombol submit di pertanyaan terakhir
                if (currentQuestionIndex === questions.length - 1) {
                    nextButton.style.display = 'none';
                    submitButton.style.display = 'block';
                }
            }
        });

        // Event listener untuk pilihan jawaban
        questions.forEach(question => {
            const options = question.querySelectorAll('.option');
            options.forEach(option => {
                option.addEventListener('click', function() {
                    options.forEach(opt => opt.classList.remove('selected'));
                    this.classList.add('selected');
                    
                    // Tampilkan tombol next jika bukan pertanyaan terakhir
                    if (currentQuestionIndex < questions.length - 1) {
                        if (!question.contains(nextButton)) {
                            question.appendChild(nextButton);
                        }
                        nextButton.style.display = 'block';
                    }
                });
            });
        });

        // Event listener untuk submit
        submitButton.addEventListener('click', function() {
            submitAdvancedQuest();
        });

        // Tampilkan container quiz
        quizContainer.style.display = 'block';
    }

    // Fungsi untuk membuat elemen pertanyaan
    function createQuestionElement(questionData, index) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.innerHTML = `
            <h3>Pertanyaan ${index + 1}</h3>
            <div class="question-text">${questionData.question}</div>
            <div class="quiz-options">
                <div class="option-row">
                    <button class="option">A. ${questionData.answers[0].text}</button>
                    <button class="option">B. ${questionData.answers[1].text}</button>
                </div>
                <div class="option-row">
                    <button class="option">C. ${questionData.answers[2].text}</button>
                    <button class="option">D. ${questionData.answers[3].text}</button>
                </div>
            </div>
        `;

        // Tambahkan event listener untuk pilihan jawaban
        const options = questionDiv.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                options.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
            });
        });

        return questionDiv;
    }

    // Fungsi untuk submit quest lanjutan
    function submitAdvancedQuest() {
        let quest2Score = 0;
        const questions = document.querySelectorAll('.quiz-question');
        const quest1Score = parseInt(document.querySelector('.quest1-score').textContent);

        // Hitung skor quest 2
        questions.forEach((question, index) => {
            const selectedOption = question.querySelector('.option.selected');
            if (selectedOption) {
                const selectedText = selectedOption.textContent.substring(3).trim();
                const correctAnswer = quizDataAdvanced[index].answers.find(a => a.isCorrect);
                if (correctAnswer && selectedText === correctAnswer.text) {
                    quest2Score++;
                }
            }
        });

        const totalScore = quest1Score + quest2Score;

        // Perbarui HTML untuk tampilan hasil
        const submitResult = document.querySelector('.submit-result');
        submitResult.innerHTML = `
            <div class="result-content">
                <h2>Hasil Quiz Kamu</h2>
                <div class="score-number">${totalScore}</div>
                <div class="score-container">
                    <div class="quest-score">
                        <h3>Quest 1 (Dasar)</h3>
                        <div class="score-number">9</div>
                            <div class="score-details">
                                <div class="score-row">
                                    <span>Benar:</span>
                                    <span>9 pertanyaan</span>
                                </div>
                                <div class="score-row">
                                    <span>Salah:</span>
                                    <span>1 pertanyaan</span>
                                </div>
                            </div>
                        </div>
                    <div class="quest-score">
                        <h3>Quest 2 (Lanjutan)</h3>
                        <div class="score-number">10</div>
                        <div class="score-details">
                            <div class="score-row">
                                <span>Benar:</span>
                                <span>10 pertanyaan</span>
                            </div>
                            <div class="score-row">
                                <span>Salah:</span>
                                <span>5 pertanyaan</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="message-container">
                    <div class="message-box">
                        Bagus sekali! Anda memiliki dasar yang kuat dalam Islam!
                        <button class="try-again">Ulang Quiz</button>
                    </div>
                    <div class="message-box">
                        Ingin memperdalam ilmu agama Islam? Mari bergabung dengan kami!
                        <a href="../Pendaftaran/Pendaftaran.html" class="register-button">Daftar Sekarang</a>
                        </div>
                </div>
                
            </div>
        `;

        // Event listener untuk tombol ulang
        submitResult.querySelector('.try-again').addEventListener('click', () => {
            location.reload();
        });

        // Tampilkan hasil
        document.querySelector('.quiz-container').style.display = 'none';
        submitResult.style.display = 'block';
    }

    function getMotivationalMessage(totalScore) {
        if (totalScore >= 20) {
            return 'Luar biasa! Pemahaman Anda tentang Islam sangat mendalam!';
        } else if (totalScore >= 15) {
            return 'Bagus sekali! Anda memiliki dasar yang kuat dalam Islam!';
        } else {
            return 'Teruslah belajar dan tingkatkan pemahaman Anda tentang Islam!';
        }
    }

    // Inisialisasi tampilan pertama
    showQuestion(0);
});