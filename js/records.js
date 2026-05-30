(function () {
    var projectsContainer = document.getElementById('projectsContainer');
    var modal = document.getElementById('projectModal');
    var closeModalBtn = document.getElementById('closeModal');
    var modalMedia = document.getElementById('modalMedia');
    var modalTitle = document.getElementById('modalTitle');
    var modalYear = document.getElementById('modalYear');
    var modalDescription = document.getElementById('modalDescription');
    var currentOpenProject = null;

    function getLang() {
        return window.I18n ? window.I18n.getLang() : 'ja';
    }

    function localize(project, field) {
        var lang = getLang();
        var value = project[field];
        if (value && typeof value === 'object' && (value.ja || value.en)) {
            return value[lang] || value.ja || value.en;
        }
        return value;
    }

    function t(key) {
        return window.I18n ? window.I18n.t(key) : '';
    }

    function createProjectElement(project) {
        var title = localize(project, 'title');
        var description = localize(project, 'description');
        var projectElement = document.createElement('div');
        projectElement.className = 'project-item';
        projectElement.innerHTML =
            '<img src="' + project.image + '" alt="' + title + '" class="project-image">' +
            '<div class="project-info">' +
            '<h2 class="project-title">' + title + '</h2>' +
            '<p class="project-year">' + project.year + '</p>' +
            '<p class="project-description">' + description + '</p>' +
            '</div>';
        projectElement.addEventListener('click', function () {
            openModal(project);
        });
        return projectElement;
    }

    function renderProjects() {
        projectsContainer.innerHTML = '';
        window.projectsData.forEach(function (project) {
            projectsContainer.appendChild(createProjectElement(project));
        });
    }

    function getVideoMimeType(src) {
        if (src.endsWith('.mov')) return 'video/quicktime';
        if (src.endsWith('.webm')) return 'video/webm';
        return 'video/mp4';
    }

    function pauseModalVideos() {
        modal.querySelectorAll('video').forEach(function (video) {
            video.pause();
            video.removeAttribute('src');
            video.load();
        });
    }

    function closeModalDialog() {
        pauseModalVideos();
        modal.classList.remove('is-open');
        modalMedia.innerHTML = '';
        document.body.style.overflow = '';
        currentOpenProject = null;
    }

    function openModal(project) {
        currentOpenProject = project;
        var mediaItems = [];
        if (project.video) {
            mediaItems.push({ type: 'video', src: project.video });
        }
        if (project.images) {
            project.images.forEach(function (img) {
                mediaItems.push({ type: 'image', src: img });
            });
        }
        if (mediaItems.length === 0) {
            mediaItems.push({ type: 'image', src: project.image });
        }

        modalTitle.textContent = localize(project, 'title');
        modalYear.textContent = project.year;
        modalDescription.innerHTML = localize(project, 'detailedDescription');

        showMedia(project, mediaItems, 0);
        modal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function markMediaLoaded(mediaEl, loadingEl) {
        mediaEl.classList.add('is-loaded');
        loadingEl.classList.add('is-hidden');
    }

    function showMedia(project, mediaItems, index) {
        pauseModalVideos();
        modalMedia.innerHTML = '';

        var currentItem = mediaItems[index];
        var title = localize(project, 'title');

        var loadingEl = document.createElement('div');
        loadingEl.className = 'modal-loading';
        loadingEl.setAttribute('aria-label', t('records.loading') || 'Loading');
        loadingEl.innerHTML = '<div class="spinner"></div>';

        var innerEl = document.createElement('div');
        innerEl.className = 'modal-media-inner';

        var mediaEl;
        if (currentItem.type === 'video') {
            mediaEl = document.createElement('video');
            mediaEl.className = 'modal-media';
            mediaEl.controls = true;
            mediaEl.playsInline = true;
            mediaEl.preload = 'metadata';

            var source = document.createElement('source');
            source.src = currentItem.src;
            source.type = getVideoMimeType(currentItem.src);
            mediaEl.appendChild(source);

            var onVideoReady = function () {
                markMediaLoaded(mediaEl, loadingEl);
            };
            mediaEl.addEventListener('loadeddata', onVideoReady, { once: true });
            mediaEl.addEventListener('canplay', onVideoReady, { once: true });
            mediaEl.addEventListener('error', function () {
                markMediaLoaded(mediaEl, loadingEl);
            }, { once: true });
        } else {
            mediaEl = document.createElement('img');
            mediaEl.className = 'modal-media';
            mediaEl.alt = title;
            mediaEl.decoding = 'async';

            mediaEl.addEventListener('load', function () {
                markMediaLoaded(mediaEl, loadingEl);
            }, { once: true });
            mediaEl.addEventListener('error', function () {
                markMediaLoaded(mediaEl, loadingEl);
            }, { once: true });
            mediaEl.src = currentItem.src;
            if (mediaEl.complete) {
                markMediaLoaded(mediaEl, loadingEl);
            }
        }

        innerEl.appendChild(mediaEl);
        if (currentItem.type === 'video') {
            mediaEl.load();
        }
        modalMedia.appendChild(loadingEl);
        modalMedia.appendChild(innerEl);

        if (mediaItems.length > 1) {
            var counter = document.createElement('span');
            counter.className = 'modal-media-counter';
            counter.textContent = (index + 1) + ' / ' + mediaItems.length;
            modalMedia.appendChild(counter);

            var prevButton = document.createElement('button');
            prevButton.type = 'button';
            prevButton.textContent = '←';
            prevButton.className = 'navigation-button prev-button';
            prevButton.setAttribute('aria-label', t('records.prevMedia') || 'Previous');
            prevButton.addEventListener('click', function (e) {
                e.stopPropagation();
                var newIndex = (index - 1 + mediaItems.length) % mediaItems.length;
                showMedia(project, mediaItems, newIndex);
            });

            var nextButton = document.createElement('button');
            nextButton.type = 'button';
            nextButton.textContent = '→';
            nextButton.className = 'navigation-button next-button';
            nextButton.setAttribute('aria-label', t('records.nextMedia') || 'Next');
            nextButton.addEventListener('click', function (e) {
                e.stopPropagation();
                var newIndex = (index + 1) % mediaItems.length;
                showMedia(project, mediaItems, newIndex);
            });

            modalMedia.appendChild(prevButton);
            modalMedia.appendChild(nextButton);
        }
    }

    closeModalBtn.addEventListener('click', closeModalDialog);

    modal.addEventListener('click', function (event) {
        if (event.target === modal) {
            closeModalDialog();
        }
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {
            closeModalDialog();
        }
    });

    document.addEventListener('localechange', function () {
        renderProjects();
        if (currentOpenProject && modal.classList.contains('is-open')) {
            modalTitle.textContent = localize(currentOpenProject, 'title');
            modalDescription.innerHTML = localize(currentOpenProject, 'detailedDescription');
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        renderProjects();
    });
})();
