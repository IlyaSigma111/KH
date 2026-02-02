// Основной скрипт для сайта GitHub Projects Hub

// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Получаем все кнопки проектов
    const projectButtons = document.querySelectorAll('.project-link');
    
    // Добавляем обработчики событий для кнопок
    projectButtons.forEach(button => {
        // Анимация при нажатии
        button.addEventListener('mousedown', function(e) {
            this.style.transform = 'scale(0.95)';
        });
        
        // Возврат к исходному размеру при отпускании
        button.addEventListener('mouseup', function(e) {
            this.style.transform = '';
        });
        
        // Возврат к исходному размеру при уходе курсора
        button.addEventListener('mouseleave', function(e) {
            this.style.transform = '';
        });
        
        // Логирование кликов по проектам
        button.addEventListener('click', function(e) {
            const projectName = this.getAttribute('data-project');
            const projectUrl = this.getAttribute('href');
            
            console.log(`Переход на проект: ${projectName}`);
            console.log(`URL: ${projectUrl}`);
            
            // Можно добавить здесь отправку данных в аналитику
            // например: trackProjectClick(projectName);
        });
    });
    
    // Проверка адаптивности и логирование текущего режима
    function checkResponsiveMode() {
        const width = window.innerWidth;
        let mode;
        
        if (width <= 480) {
            mode = 'Мобильный (маленький)';
        } else if (width <= 768) {
            mode = 'Мобильный';
        } else if (width <= 992) {
            mode = 'Планшет';
        } else {
            mode = 'Десктоп';
        }
        
        console.log(`Режим отображения: ${mode}, ширина: ${width}px`);
        
        // Добавляем класс к body в зависимости от размера экрана
        document.body.classList.remove('mobile-mode', 'tablet-mode', 'desktop-mode');
        
        if (width <= 768) {
            document.body.classList.add('mobile-mode');
        } else if (width <= 992) {
            document.body.classList.add('tablet-mode');
        } else {
            document.body.classList.add('desktop-mode');
        }
        
        return mode;
    }
    
    // Проверяем текущую тему оформления
    function checkColorScheme() {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        console.log(`Тема оформления: ${isDarkMode ? 'Темная' : 'Светлая'}`);
        return isDarkMode ? 'dark' : 'light';
    }
    
    // Инициализация при загрузке
    function init() {
        console.log('GitHub Projects Hub инициализирован');
        
        // Проверяем адаптивность
        checkResponsiveMode();
        
        // Проверяем тему оформления
        checkColorScheme();
        
        // Добавляем анимацию появления карточек
        const cards = document.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 * index);
        });
        
        // Добавляем текущую дату в подвал
        const currentDate = new Date();
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = currentDate.toLocaleDateString('ru-RU', dateOptions);
        
        const dateElement = document.createElement('p');
        dateElement.textContent = `Дата: ${dateString}`;
        dateElement.style.marginTop = '10px';
        dateElement.style.fontSize = '0.8rem';
        dateElement.style.color = '#8b949e';
        
        document.querySelector('footer').appendChild(dateElement);
    }
    
    // Обработчики событий изменения размера окна
    let resizeTimeout;
    window.addEventListener('resize', function() {
        // Используем debounce для оптимизации
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            checkResponsiveMode();
        }, 250);
    });
    
    // Обработчик изменения темы оформления
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkColorScheme);
    
    // Инициализируем приложение
    init();
    
    // Дополнительные функции (можно раскомментировать при необходимости)
    
    // Функция для имитации отслеживания кликов (для аналитики)
    /*
    function trackProjectClick(projectName) {
        // В реальном приложении здесь может быть отправка данных на сервер
        console.log(`Отслеживание: пользователь кликнул на проект ${projectName}`);
        
        // Пример с использованием localStorage для хранения статистики
        let stats = JSON.parse(localStorage.getItem('projectStats')) || {};
        stats[projectName] = (stats[projectName] || 0) + 1;
        localStorage.setItem('projectStats', JSON.stringify(stats));
        
        console.log(`Статистика: ${stats[projectName]} кликов по проекту ${projectName}`);
    }
    */
    
    // Функция для проверки доступности проектов
    /*
    function checkProjectsAvailability() {
        const projects = [
            { name: 'EMKAHOOT', url: 'https://ilyasigma111.github.io/EMKAHOOT/' },
            { name: 'BrainRotQuiz', url: 'https://ilyasigma111.github.io/BrainRotQuiz/index.html' }
        ];
        
        projects.forEach(project => {
            fetch(project.url, { mode: 'no-cors' })
                .then(() => {
                    console.log(`Проект ${project.name} доступен`);
                })
                .catch(() => {
                    console.warn(`Проект ${project.name} может быть недоступен`);
                });
        });
    }
    
    // Проверяем доступность проектов при загрузке (осторожно, может быть CORS issues)
    // checkProjectsAvailability();
    */
});
