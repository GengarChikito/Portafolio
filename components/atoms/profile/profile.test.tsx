import { describe, it, expect } from "vitest";
import { profile } from "./profile";

// Helpers
const isHttpUrl = (s: string) => /^https?:\/\//i.test(s);
const isDataUrl = (s: string) => /^data:/i.test(s);
const isHttpOrData = (s: string) => isHttpUrl(s) || isDataUrl(s);
const isRelativeAsset = (s: string) => /^\/(assets|img|images)\//i.test(s);
const nonEmptyString = (v: unknown) => typeof v === "string" && v.trim().length > 0;

describe("Profile data (shape & integrity)", () => {
    it("nombre, headline y description deben ser strings no vacíos", () => {
        expect(nonEmptyString(profile.name)).toBe(true);
        expect(nonEmptyString(profile.headline)).toBe(true);
        expect(nonEmptyString(profile.description)).toBe(true);
    });

    it("photoUrl (si existe) es relativa /assets... o URL http(s)/data:", () => {
        if (profile.photoUrl !== undefined) {
            expect(nonEmptyString(profile.photoUrl)).toBe(true);
            expect(isRelativeAsset(profile.photoUrl) || isHttpOrData(profile.photoUrl)).toBe(true);
        }
    });

    it("links principales válidos (linkedin, github, resumeUrl) y email", () => {
        expect(nonEmptyString(profile.linkedin)).toBe(true);
        expect(isHttpUrl(profile.linkedin)).toBe(true);

        expect(nonEmptyString(profile.github)).toBe(true);
        expect(isHttpUrl(profile.github)).toBe(true);

        expect(nonEmptyString(profile.resumeUrl)).toBe(true);
        expect(isHttpUrl(profile.resumeUrl)).toBe(true);

        expect(nonEmptyString(profile.email)).toBe(true);
        expect(/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(profile.email)).toBe(true);
    });

    it("skills es un arreglo no vacío de strings", () => {
        expect(Array.isArray(profile.skills)).toBe(true);
        expect(profile.skills.length).toBeGreaterThan(0);
        for (const s of profile.skills) expect(nonEmptyString(s)).toBe(true);
    });

    it("projects: title/summary/tags/link/image válidos (link http(s), image http(s) o data:)", () => {
        expect(Array.isArray(profile.projects)).toBe(true);
        expect(profile.projects.length).toBeGreaterThan(0);

        for (const p of profile.projects) {
            expect(nonEmptyString(p.title)).toBe(true);
            expect(nonEmptyString(p.summary)).toBe(true);

            expect(Array.isArray(p.tags)).toBe(true);
            expect(p.tags.length).toBeGreaterThan(0);
            for (const t of p.tags) expect(nonEmptyString(t)).toBe(true);

            expect(nonEmptyString(p.link)).toBe(true);
            expect(isHttpUrl(p.link)).toBe(true);

            expect(nonEmptyString(p.image)).toBe(true);
            expect(isHttpOrData(p.image)).toBe(true);
        }
    });

    it("experience: role/title/company/period, opcionales string", () => {
        expect(Array.isArray(profile.experience)).toBe(true);
        expect(profile.experience.length).toBeGreaterThan(0);

        for (const e of profile.experience) {
            expect(nonEmptyString(e.role)).toBe(true);
            expect(nonEmptyString(e.title)).toBe(true);
            expect(nonEmptyString(e.company)).toBe(true);
            expect(nonEmptyString(e.period)).toBe(true);
            if (e.details !== undefined) expect(typeof e.details).toBe("string");
            if (e.description !== undefined) expect(typeof e.description).toBe("string");
        }
    });

    it("education: grade/place/period y acepta degree/institution/details/description", () => {
        expect(Array.isArray(profile.education)).toBe(true);
        expect(profile.education.length).toBeGreaterThan(0);

        for (const ed of profile.education) {
            expect(nonEmptyString(ed.grade)).toBe(true);
            expect(nonEmptyString(ed.place)).toBe(true);
            expect(nonEmptyString(ed.period)).toBe(true);
            if (ed.degree !== undefined) expect(typeof ed.degree).toBe("string");
            if (ed.institution !== undefined) expect(typeof ed.institution).toBe("string");
            if (ed.details !== undefined) expect(typeof ed.details).toBe("string");
            if (ed.description !== undefined) expect(typeof ed.description).toBe("string");
        }
    });

    it("certification: estructura correcta + URLs válidas (image http/data, credential http)", () => {
        expect(Array.isArray(profile.certification)).toBe(true);
        expect(profile.certification.length).toBeGreaterThan(0);

        for (const c of profile.certification) {
            expect(nonEmptyString(c.certificateName)).toBe(true);
            expect(nonEmptyString(c.issuer)).toBe(true);
            expect(nonEmptyString(c.issued)).toBe(true);
            expect(nonEmptyString(c.imageUrl)).toBe(true);
            expect(isHttpOrData(c.imageUrl)).toBe(true);
            expect(nonEmptyString(c.credentialUrl)).toBe(true);
            expect(isHttpUrl(c.credentialUrl)).toBe(true);
        }
    });
});
