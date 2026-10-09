"use strict";

// Feature 1: validate locally, then display user input safely as text.
function setupContactForm() {
    const form = document.querySelector("#contact-form");
    const name = document.querySelector("#contact-name");
    const email = document.querySelector("#contact-email");
    const message = document.querySelector("#contact-message");
    const fields = [name, email, message];
    const errors = ["name-error", "email-error", "message-error"];
    const status = document.querySelector("#form-status");
    const preview = document.querySelector("#contact-preview");
    const placeholder = document.querySelector("#preview-placeholder");

    // Clear stale previews when the visitor edits or resets the form.
    function clearPreview() {
        preview.hidden = true;
        placeholder.hidden = false;
        ["preview-name", "preview-email", "preview-message"].forEach((id) => {
            document.getElementById(id).textContent = "";
        });
    }

    function showError(field, errorId, text) {
        const error = document.getElementById(errorId);
        error.textContent = text;
        error.hidden = !text;
        if (text) field.setAttribute("aria-invalid", "true");
        else field.removeAttribute("aria-invalid");
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        clearPreview();
        const values = fields.map((field) => field.value.trim());
        // Native email checking plus a dotted domain reject common typing mistakes.
        const emailIsValid = email.validity.valid && /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(values[1]);
        const messages = [
            values[0] ? "" : "Please enter your name, not just spaces.",
            emailIsValid ? "" : "Enter a valid email address, such as name@example.com.",
            values[2] ? "" : "Please enter a message, not just spaces."
        ];
        fields.forEach((field, index) => showError(field, errors[index], messages[index]));
        const invalidIndex = messages.findIndex((text) => text !== "");
        if (invalidIndex !== -1) {
            status.textContent = "Please correct the highlighted fields. No message was sent.";
            fields[invalidIndex].focus();
            return;
        }
        document.querySelector("#preview-name").textContent = values[0];
        document.querySelector("#preview-email").textContent = values[1];
        document.querySelector("#preview-message").textContent = values[2];
        placeholder.hidden = true;
        preview.hidden = false;
        status.textContent = "Data validated. Your local preview is ready in the preview area. No message was sent.";
    });
    fields.forEach((field, index) => {
        field.addEventListener("input", () => {
            clearPreview();
            status.textContent = "";
            showError(field, errors[index], "");
        });
    });
    form.addEventListener("reset", () => {
        clearPreview();
        fields.forEach((field, index) => showError(field, errors[index], ""));
        status.textContent = "Form and preview cleared.";
    });
    // Inline validation replaces browser bubbles; required attributes remain.
    form.noValidate = true;
    document.querySelector("#preview-button").disabled = false;
}

// Feature 2: browse the existing photos, wrapping at both gallery boundaries.
function setupGallery() {
    const photos = Array.from(document.querySelectorAll("#photo-gallery figure"));
    const counter = document.querySelector("#photo-counter");
    const status = document.querySelector("#gallery-status");
    let currentIndex = 0;
    function showPhoto(index, announce = true) {
        currentIndex = (index + photos.length) % photos.length;
        photos.forEach((photo, photoIndex) => { photo.hidden = photoIndex !== currentIndex; });
        counter.textContent = `${currentIndex + 1} / ${photos.length}`;
        if (announce) {
            const caption = photos[currentIndex].querySelector("figcaption").textContent;
            status.textContent = `${currentIndex + 1} of ${photos.length}. ${caption}`;
        }
    }
    document.querySelector("#previous-photo").addEventListener("click", () => showPhoto(currentIndex - 1));
    document.querySelector("#next-photo").addEventListener("click", () => showPhoto(currentIndex + 1));
    showPhoto(0, false);
    document.querySelector("#gallery-controls").hidden = false;
    document.querySelector("#gallery-help").hidden = false;
}

// Feature 3: filter three skill cards and explain empty search results.
function setupSkillSearch() {
    const search = document.querySelector("#skill-search");
    const cards = Array.from(document.querySelectorAll(".skill-card"));
    const status = document.querySelector("#skill-status");
    function filterSkills() {
        const query = search.value.trim().toLowerCase();
        let matches = 0;
        cards.forEach((card) => {
            const matched = card.textContent.toLowerCase().includes(query);
            card.hidden = !matched;
            if (matched) matches += 1;
        });
        status.textContent = matches === 0
            ? "No skills match your search. Try HTML, CSS or JavaScript, or reset the search."
            : `Showing ${matches} of ${cards.length} skills.`;
    }
    search.addEventListener("input", filterSkills);
    search.addEventListener("search", filterSkills);
    document.querySelector("#reset-skills").addEventListener("click", () => {
        search.value = "";
        filterSkills();
        search.focus();
    });
    filterSkills();
    document.querySelector("#skill-tools").hidden = false;
    status.hidden = false;
}

// Feature 4: switch between readable light and dark colour palettes.
function setupThemeSwitch() {
    const button = document.querySelector("#theme-toggle");
    const root = document.documentElement;
    let theme = "light";
    try {
        if (localStorage.getItem("nelson-theme") === "dark") theme = "dark";
    } catch {
        // The switch still works if a browser blocks local storage.
    }
    function applyTheme(value) {
        root.dataset.theme = value;
        button.setAttribute("aria-pressed", String(value === "dark"));
        button.textContent = value === "dark" ? "Light mode" : "Dark mode";
        button.setAttribute("aria-label", value === "dark" ? "Switch to light mode" : "Switch to dark mode");
    }
    applyTheme(theme);
    button.addEventListener("click", () => {
        theme = root.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(theme);
        try { localStorage.setItem("nelson-theme", theme); }
        catch { /* Saving is optional; no contact data is stored. */ }
    });
    button.hidden = false;
}

setupContactForm();
setupGallery();
setupSkillSearch();
setupThemeSwitch();
