import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const slugs = [
  "design-systems",
  "frontend-performance",
  "data-visualization",
  "creative-engineering",
];
for (const locale of ["en", "pt-BR"]) {
  for (const path of [...slugs.map((slug) => `work/${slug}/`), "workbench/"]) {
    test(`${locale}/${path} exports, refreshes, and passes axe`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      expect((await page.goto(`/2026/${locale}/${path}`))?.status()).toBe(200);
      expect((await page.reload())?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}

test(
  "exhibition has twelve cards, local artwork, filters, and keyboard expansion",
  { tag: "@journey" },
  async ({ page }, testInfo) => {
    await page.goto("/2026/en/");
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("[data-tile]")).toHaveCount(12);
    expect(
      await page
        .locator("[data-tile]")
        .evaluateAll((cards) =>
          cards
            .filter((card) => card.scrollHeight > card.clientHeight + 2)
            .map((card) => card.getAttribute("data-tile")),
        ),
    ).toEqual([]);
    const images = page.locator(".tile img");
    expect(await images.count()).toBeGreaterThanOrEqual(6);
    for (const img of await images.all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (element: HTMLImageElement) =>
              element.complete && element.naturalWidth > 0,
          ),
        )
        .toBe(true);
      expect(await img.getAttribute("src")).toMatch(/^\/2026\/images\//);
    }
    await page
      .getByRole("button", { name: "Case studies (4)", exact: true })
      .click();
    await expect(page.locator("[data-tile]")).toHaveCount(4);
    await test.step("Expand an engineering case study using the keyboard", async () => {
      const trigger = page.getByRole("link", {
        name: "Systems That Scale",
        exact: true,
      });
      await trigger.focus();
      await page.keyboard.press("Enter");
      const dialog = page.getByRole("dialog");
      await expect(dialog).toBeVisible();
      await expect(
        dialog.getByRole("heading", {
          name: "Systems That Scale",
          exact: true,
        }),
      ).toBeVisible();
      await expect(
        page.getByRole("button", { name: "Close expanded card", exact: true }),
      ).toBeFocused();
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
      if (process.env.PORTFOLIO_EVIDENCE_MODE === "ux")
        await testInfo.attach("Expanded Design Systems case study", {
          body: await page.screenshot({ animations: "disabled" }),
          contentType: "image/png",
        });
      await page.keyboard.press("Escape");
      await expect(dialog).not.toBeVisible();
      await expect(trigger).toBeFocused();
    });
    for (const title of ["0.8s Faster", "Impossible? Challenge Accepted"]) {
      await test.step(`Expand ${title}`, async () => {
        await page.getByRole("link", { name: title, exact: true }).click();
        await expect(page.getByRole("dialog")).toBeVisible();
        await expect(
          page
            .getByRole("dialog")
            .getByRole("heading", { name: title, exact: true }),
        ).toBeVisible();
        if (process.env.PORTFOLIO_EVIDENCE_MODE === "ux")
          await testInfo.attach(`Expanded ${title}`, {
            body: await page.screenshot({ animations: "disabled" }),
            contentType: "image/png",
          });
        await page.keyboard.press("Escape");
        await expect(page.getByRole("dialog")).not.toBeVisible();
      });
    }
    await page
      .getByRole("button", { name: "All work (12)", exact: true })
      .click();
    await page
      .getByRole("link", { name: "Beyond the Mockup", exact: true })
      .click();
    await expect(page.getByRole("dialog")).toContainText("A working prototype");
    await page.keyboard.press("Escape");
    await page
      .getByRole("link", { name: "Data, Beautifully Engineered", exact: true })
      .click();
    if (process.env.PORTFOLIO_EVIDENCE_MODE === "ux")
      await testInfo.attach("Expanded Data Visualization case study", {
        body: await page.screenshot({ animations: "disabled" }),
        contentType: "image/png",
      });
    await page
      .getByRole("link", { name: "Read full case study", exact: false })
      .click();
    await expect(page).toHaveURL(/\/2026\/en\/work\/data-visualization\//);
    await page.reload();
    const control = page.getByRole("slider", { name: "Sample value" });
    await control.focus();
    await control.press("End");
    await expect(page.locator("output")).toHaveText("100%");
    await expect(
      page.getByRole("img", { name: "Sample value: 100%" }),
    ).toBeVisible();
    if (process.env.PORTFOLIO_EVIDENCE_MODE === "ux")
      await testInfo.attach("SVG gauge changed by keyboard", {
        body: await page.screenshot({ animations: "disabled" }),
        contentType: "image/png",
      });
  },
);

test(
  "palettes preserve card layouts and workbench controls update real components",
  { tag: "@journey" },
  async ({ page }, testInfo) => {
    await page.goto("/2026/en/");
    await page.evaluate(() => document.fonts.ready);
    const first = page.locator('[data-tile="identity"]');
    // Document coordinates also catch vertical shifts when a palette changes gaps.
    const geometry = () =>
      page.locator("[data-tile], #workbench").evaluateAll((elements) =>
        elements.map((element) => {
          const { x, y, width, height } = element.getBoundingClientRect();
          return { x: x + scrollX, y: y + scrollY, width, height };
        }),
      );
    const baseline = await geometry();
    const baselineGap = await page.locator(".tile-grid").evaluate(
      (element) => getComputedStyle(element).gap,
    );
    const backgrounds: string[] = [];
    for (const palette of ["swiss", "paper", "cobalt", "night"]) {
      await page.getByLabel("Color palette").first().selectOption(palette);
      await expect(page.locator(".portfolio-app")).toHaveAttribute(
        "data-palette",
        palette,
      );
      expect(await geometry()).toEqual(baseline);
      await expect(page.locator(".tile-grid")).toHaveCSS("gap", baselineGap);
      backgrounds.push(
        await first.evaluate(
          (element) => getComputedStyle(element).backgroundColor,
        ),
      );
      expect(
        (
          await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
      if (process.env.PORTFOLIO_EVIDENCE_MODE === "ux") {
        await first.scrollIntoViewIfNeeded();
        await testInfo.attach(`${palette} palette gallery spacing`, {
          body: await page.screenshot({ animations: "disabled" }),
          contentType: "image/png",
        });
      }
    }
    expect(new Set(backgrounds).size).toBe(4);
    await page.reload();
    await expect(page.locator(".portfolio-app")).toHaveAttribute(
      "data-palette",
      "night",
    );
    const workbench = page.locator("#workbench");
    await workbench
      .getByRole("radio", { name: "Spacious", exact: true })
      .check();
    await expect(workbench.locator("pre")).toContainText("--demo-space: 2rem");
    await workbench
      .getByRole("radio", { name: "Outline", exact: true })
      .check();
    await workbench.getByRole("checkbox", { name: "Show focus guide" }).check();
    const action = workbench.getByRole("button", {
      name: "Try this interaction",
    });
    await action.click();
    await expect(action).toHaveAttribute("aria-pressed", "true");
    await expect(workbench.getByRole("status")).toHaveText(
      "Interaction active",
    );
    if (process.env.PORTFOLIO_EVIDENCE_MODE === "ux")
      await testInfo.attach("Night palette and spacious workbench", {
        body: await page.screenshot({ animations: "disabled" }),
        contentType: "image/png",
      });
  },
);

test("narrow layouts and reduced motion remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/2026/pt-BR/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("[data-tile]")).toHaveCount(12);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(
    await page
      .locator(".race-road i")
      .first()
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  await page
    .getByRole("link", { name: "Impossível? Desafio Aceito", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  expect(
    await page
      .getByRole("dialog")
      .evaluate((element) => element.scrollWidth <= element.clientWidth),
  ).toBe(true);
  await page.keyboard.press("Escape");
});
