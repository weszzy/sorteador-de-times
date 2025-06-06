document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('draw-button');
    const playerNamesTextarea = document.getElementById('player-names');
    const teamSizeInput = document.getElementById('team-size');
    const resultsSection = document.getElementById('results-section');
    const teamsContainer = document.getElementById('teams-container');
    const leftoversContainer = document.getElementById('leftovers-container');
    const leftoversList = document.getElementById('leftovers-list');

    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const body = document.body;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    };

    const toggleTheme = () => {
        const newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    };

    const initializeTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (savedTheme) {
            applyTheme(savedTheme);
        } else {
            applyTheme(systemPrefersDark ? 'dark' : 'light');
        }
    };

    sunIcon.addEventListener('click', toggleTheme);
    moonIcon.addEventListener('click', toggleTheme);

    initializeTheme();

    drawButton.addEventListener('click', () => {
        const playersString = playerNamesTextarea.value;
        const teamSize = parseInt(teamSizeInput.value, 10);

        const players = playersString.split('\n')
            .map(name => name.trim())
            .filter(name => name !== '');

        if (players.length < teamSize || teamSize <= 1) {
            alert('Erro: Verifique o número de jogadores e o tamanho do time.');
            return;
        }

        const shuffledPlayers = shuffleArray(players);
        const teams = [];
        const totalPlayers = shuffledPlayers.length;
        const numberOfTeams = Math.floor(totalPlayers / teamSize);

        for (let i = 0; i < numberOfTeams; i++) {
            const team = shuffledPlayers.splice(0, teamSize);
            teams.push(team);
        }

        const leftovers = shuffledPlayers;
        displayResults(teams, leftovers);
    });

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function displayResults(teams, leftovers) {
        teamsContainer.innerHTML = '';
        leftoversList.innerHTML = '';

        teams.forEach((team, index) => {
            const teamCard = document.createElement('div');
            teamCard.className = 'team-card';

            const title = document.createElement('h3');
            title.textContent = `Time ${index + 1}`;
            teamCard.appendChild(title);

            const playerList = document.createElement('ul');
            team.forEach(player => {
                const listItem = document.createElement('li');
                listItem.textContent = player;
                playerList.appendChild(listItem);
            });

            teamCard.appendChild(playerList);
            teamsContainer.appendChild(teamCard);
        });

        if (leftovers.length > 0) {
            leftovers.forEach(player => {
                const listItem = document.createElement('li');
                listItem.textContent = player;
                leftoversList.appendChild(listItem);
            });
            leftoversContainer.classList.remove('hidden');
        } else {
            leftoversContainer.classList.add('hidden');
        }

        resultsSection.classList.remove('hidden');
    }
});