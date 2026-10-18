# AGENTS.md

## General Engineering Principles

Follow these rules whenever creating, modifying, reviewing, or refactoring code. Prioritize correctness, maintainability, readability, type safety, accessibility, and consistency with the existing project architecture.

### SOLID Principles

- **Single Responsibility Principle (SRP):** Ensure every class, module, and function has one clearly defined responsibility and one primary reason to change. Split unrelated responsibilities into separate components.
- **Open/Closed Principle (OCP):** Design components to support new behavior through extension, composition, or well-defined interfaces without requiring modifications to stable, existing code.
- **Liskov Substitution Principle (LSP):** Ensure implementations of a base type or interface can replace that type without breaking expected behavior, contracts, or invariants.
- **Interface Segregation Principle (ISP):** Prefer small, cohesive interfaces tailored to specific consumers over large interfaces that force implementations to support unused functionality.
- **Dependency Inversion Principle (DIP):** Make high-level business logic depend on abstractions rather than concrete infrastructure implementations. Inject dependencies when appropriate.
- Avoid introducing unnecessary abstractions, interfaces, classes, or design patterns. Apply SOLID proportionately to the complexity and requirements of the application.
- When refactoring, preserve existing public contracts and behavior unless the task explicitly requires a change.

### DRY Principles

- **Don't Repeat Yourself (DRY):** Maintain a single authoritative representation of each distinct piece of business knowledge, rule, or invariant.
- Extract genuinely duplicated logic into reusable functions, modules, classes, components, or shared utilities when doing so improves clarity and maintainability.
- Reuse existing project utilities, components, types, and abstractions before introducing new ones.
- Keep configuration, validation rules, constants, and business policies centralized when multiple consumers must follow the same rule.
- Avoid copy-pasting logic with the intention of synchronizing multiple copies later.
- Do not over-abstract code merely because two implementations look similar. Keep separate implementations when their behavior, responsibilities, or expected evolution differs meaningfully.
- Prefer straightforward duplication over premature abstraction when extracting shared code would create unnecessary coupling or obscure intent.
- When fixing a defect in shared logic, check whether other consumers are affected and add appropriate regression tests.

### Descriptive Naming

- Use descriptive, intention-revealing names for variables, constants, functions, methods, classes, interfaces, types, modules, and components.
- Prefer names that explain the purpose, meaning, or expected behavior of an identifier rather than its implementation details.
- Use established naming conventions consistently:
  - `camelCase` for variables and functions.
  - `PascalCase` for classes, interfaces, types, and components.
  - `UPPER_SNAKE_CASE` for true global constants when consistent with project conventions.
- Use meaningful domain terminology and established vocabulary throughout the codebase.
- Avoid vague names such as `data`, `value`, `item`, `temp`, `obj`, `manager`, and `helper` when a more specific name is available. These names are acceptable when their meaning is genuinely clear from context.
- Avoid unexplained abbreviations, single-letter identifiers, and cryptic names except for conventional cases such as short mathematical expressions or loop indices.
- Name Boolean variables and functions so their truth conditions are apparent, using prefixes such as `is`, `has`, `can`, or `should` when appropriate.
- Name functions and methods with verbs or verb phrases that communicate their actions, such as `calculateInvoiceTotal`, `validateEmailAddress`, or `fetchCustomerProfile`.
- Name classes, interfaces, and types after the concepts or responsibilities they represent.
- Prefer names that make call sites understandable without requiring the reader to inspect the implementation.
- Do not introduce redundant names that merely repeat information already obvious from the surrounding context.

### Self-Documenting Methods and Classes

- Write code that communicates its intent through clear naming, cohesive responsibilities, explicit types, simple control flow, and consistent structure.
- Ensure every class has a clear purpose, a well-defined public API, and explicit responsibilities.
- Ensure every public method has a clear name, defined inputs, predictable outputs, and documented side effects or failure behavior where applicable.
- Use explicit parameter and return types when they improve API clarity, especially for public functions, exported functions, reusable utilities, and complex contracts.
- Add JSDoc comments to public APIs, exported classes, interfaces, and methods when their purpose, usage, constraints, parameters, return values, exceptions, or side effects are not self-evident.
- Document non-obvious business rules, important invariants, architectural decisions, concurrency assumptions, and nontrivial algorithms.
- Use `@param`, `@returns`, `@throws`, `@example`, and related JSDoc tags when they provide meaningful information to API consumers.
- Explain why a non-obvious decision is necessary rather than restating what the code already does.
- Keep documentation synchronized with implementation changes. Remove or update comments that become inaccurate.
- Avoid redundant comments that simply translate code into English.
- Avoid using comments as a substitute for clear naming, appropriate decomposition, or simplifying unnecessarily complicated logic.
- Keep methods focused and reasonably small. Extract meaningful operations into well-named functions when doing so improves readability.
- Prefer guard clauses and early returns when they reduce unnecessary nesting without obscuring the intended control flow.
- Make error handling and side effects explicit. Do not silently swallow errors or conceal important failure conditions.
- Use examples or tests to clarify complex public APIs and expected behavior when prose alone is insufficient.

## Typescript Best Practices

Follow the TypeScript guidelines in the official TypeScript declaration-file documentation and the W3Schools TypeScript best practices guide.

References:

- [https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html](<https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html>)
- [https://www.w3schools.com/typescript/typescript\_best\_practices.php](<https://www.w3schools.com/typescript/typescript_best_practices.php>)

### Type Safety and Compiler Configuration

- Enable `"strict": true` in `tsconfig.json` for new projects and maintain strict type checking in existing projects whenever feasible.
- Enable additional strictness options when appropriate, including `noImplicitAny`, `strictNullChecks`, and `strictPropertyInitialization`. Recognize that `strict: true` already enables the core strict checks.
- Resolve TypeScript compiler errors instead of suppressing them or bypassing the type system.
- Avoid `any` because it disables meaningful type checking. Prefer a specific type, a generic constraint, or `unknown` when the value's type is not yet known.
- When using `unknown`, validate or narrow the value before performing type-specific operations.
- Avoid unsafe type assertions and non-null assertions unless a specific invariant justifies them. Prefer runtime validation, type guards, or better type definitions.
- Use TypeScript's type inference when the intended type is unambiguous. Do not add redundant annotations solely to repeat what the compiler already knows.
- Add explicit return types to exported APIs and other functions where they improve readability, contract stability, or maintainability.
- Use appropriate types for nullable and optional values, and handle `null` and `undefined` deliberately.
- Use optional chaining (`?.`) and nullish coalescing (`??`) when they correctly express the intended behavior. Do not use them to hide invalid assumptions.
- Use type guards, discriminated unions, and control-flow narrowing to safely handle values with multiple possible types.
- Prefer compile-time guarantees over runtime assumptions whenever practical.

### Primitive Types and Generics

- Use lowercase primitive types: `string`, `number`, `boolean`, `symbol`, and `bigint` where appropriate.
- Do not use the boxed types `String`, `Number`, `Boolean`, `Symbol`, or `Object` as substitutes for primitive types.
- Use `object` when a non-primitive object type is intended, rather than the overly broad boxed `Object` type.
- Define generics only when their type parameters meaningfully contribute to type safety, relationships between types, or reusable behavior.
- Do not introduce unused or meaningless generic type parameters.
- Constrain generic parameters with `extends` when the implementation requires specific properties or capabilities.
- Prefer specific types when the expected shape is known. Use generics when they provide genuine flexibility without sacrificing type safety.
- Use `void` as the return type for callbacks whose return values are intentionally ignored.
- Avoid optional callback parameters unless the callback may genuinely be invoked without those arguments.
- Use type-only imports and exports (`import type` and `export type`) when importing or exporting types without runtime values, following the project's module configuration.

### Interfaces, Type Aliases, and Data Models

- Use `interface` primarily to describe object shapes that may be extended or implemented.
- Use `type` for union types, intersection types, tuples, mapped types, and other type compositions where appropriate.
- Follow existing project conventions when choosing between interfaces and type aliases.
- Reuse existing domain models and shared types instead of duplicating structurally identical definitions unnecessarily.
- Model mutually exclusive states using discriminated unions rather than unrelated Boolean flags when this improves correctness.
- Prefer explicit, narrow types over overly broad types such as `object`, `{}`, or `any`.
- Use built-in utility types such as `Partial<T>`, `Pick<T>`, `Omit<T>`, `Readonly<T>`, and `Record<K, V>` when they accurately represent the intended transformation.
- Avoid unnecessarily complex recursive conditional types and deeply nested mapped types. Prefer simpler, maintainable alternatives.
- Use `as const` when literal values should retain narrow, readonly types.
- Define optional properties only when the property may legitimately be absent.
- Model external data, API responses, environment variables, and user input as untrusted until validated.

### Functions, Callbacks, and Overloads

- Give functions descriptive names, well-defined parameters, and predictable return behavior.
- Prefer simple, cohesive functions over methods that combine unrelated responsibilities.
- Avoid overloads that differ only in callback arity. Use a single signature with the maximum callback parameter list when appropriate.
- Order function overloads from the most specific signature to the most general signature so that specific matches are not hidden by broad signatures.
- Prefer optional parameters over multiple overloads that differ only by trailing parameters, provided the signatures share compatible return types and semantics.
- Prefer union types over multiple overloads that differ only in the type of one parameter when a union accurately models the API.
- Preserve distinct overloads when they express genuinely different return types or behavioral contracts.
- Use default parameter values when they express a meaningful default and simplify conditional logic.
- Use rest parameters for functions that legitimately accept a variable number of arguments.
- Avoid unnecessary nested conditionals and deeply nested control flow.
- Handle asynchronous operations using `async`/`await` where it improves readability.
- Use `Promise.all` for independent asynchronous operations when concurrent execution is safe and appropriate. Do not parallelize operations that depend on each other's results or ordering.
- Handle rejected promises and asynchronous errors deliberately.

### Code Organization and Maintainability

- Follow the existing project structure, module system, formatting rules, linting configuration, and naming conventions.
- Keep modules focused on related functionality and minimize unnecessary coupling between modules.
- Prefer composition over inheritance when it produces simpler and more flexible designs.
- Avoid unnecessary mutations. Prefer `const` by default and use `let` only when reassignment is required.
- Use immutable data structures or readonly types where they improve correctness and make ownership clearer.
- Avoid unnecessary type assertions, `@ts-ignore`, and `@ts-nocheck`. If suppression is unavoidable, keep it narrowly scoped and explain the reason.
- Use `@ts-expect-error` rather than `@ts-ignore` when intentionally testing or documenting an expected compiler error, so that obsolete suppressions can be detected.
- Avoid duplicating type definitions across modules. Establish shared types where there is a genuine common contract.
- Keep exported APIs minimal and intentional. Do not expose internal implementation details without a clear requirement.
- Avoid introducing custom utility types when a standard TypeScript utility type already expresses the requirement adequately.
- Use type-only imports and exports appropriately and follow the configured module-resolution strategy.
- Keep `tsconfig.json` and build configuration aligned with the project's runtime, tooling, and deployment environment.
- Never change compiler settings simply to silence errors without understanding the consequences.

### Validation and Testing

- Run the project's TypeScript compiler or equivalent type-checking command after meaningful changes.
- Run relevant linting, formatting, and automated tests when available.
- Add or update tests for changed behavior, boundary cases, invalid inputs, and regression scenarios.
- Validate external data at runtime. Type declarations alone do not validate JSON, network responses, or user input.
- Test null, undefined, empty values, and unexpected input types wherever they are legitimate possibilities.
- Ensure new code does not introduce compiler errors, avoidable unsafe casts, or regressions in existing behavior.
- When modifying public types or exported APIs, verify that existing consumers remain compatible or document intentional breaking changes.

## Responsive Web Design Principles

Follow the responsive design guidance from MDN Web Docs.

Reference:

- [https://developer.mozilla.org/en-US/docs/Learn\_web\_development/Core/CSS\_layout/Responsive\_Design](<https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design>)

### Responsive Design Fundamentals

- Build every web page and component to adapt to different viewport widths, screen resolutions, orientations, and input methods.
- Treat responsive design as a default requirement, not an optional enhancement or a separate mobile-only implementation.
- Prioritize content readability, accessibility, usability, and functionality across mobile phones, tablets, laptops, desktops, and other supported devices.
- Design layouts around content requirements rather than targeting specific device models.
- Avoid fixed-width layouts that cause horizontal scrolling, clipped content, overlapping elements, or inaccessible controls.
- Prefer fluid layouts that use available space efficiently while maintaining sensible maximum and minimum dimensions.
- Test intermediate viewport widths as well as common device sizes. Do not assume that a layout that works at two specific widths will work at every width between them.
- Preserve essential content and functionality across viewport sizes. Do not remove important information merely to simplify the mobile layout.
- Consider performance, bandwidth, and device capabilities when selecting assets, rendering effects, and loading resources.

### Mobile-First CSS

- Prefer a mobile-first approach: implement a functional, readable single-column layout for narrow viewports, then progressively enhance the layout for wider screens.
- Write base styles for the smallest practical layout and use media queries to introduce additional columns, spacing, navigation patterns, or other enhancements when the content requires them.
- Avoid designing exclusively for desktop and then attempting to compress every element into a narrow screen.
- Use breakpoints when the content or layout begins to require a change, rather than choosing breakpoints solely because they correspond to popular device dimensions.
- Define breakpoints consistently and use relative units such as `em` or `rem` where appropriate.
- Keep media queries focused on meaningful layout changes. Do not create excessive breakpoints for minor cosmetic differences.
- Remember that media queries are not mandatory for every responsive component. Flexible layouts and intrinsic sizing can often handle resizing without explicit breakpoints.

### Flexible Layouts and Sizing

- Prefer CSS Grid and Flexbox for modern responsive layouts.
- Use Grid for two-dimensional layouts and Flexbox for one-dimensional alignment and distribution, choosing the technique that best matches the component's needs.
- Prefer relative sizing and intrinsic layout behavior over rigid pixel-based dimensions.
- Use appropriate combinations of `%`, `rem`, `em`, `min()`, `max()`, `clamp()`, `min-width`, and `max-width` to create flexible layouts.
- Use `minmax()` and responsive Grid patterns such as `auto-fit` or `auto-fill` when they simplify adaptive column layouts.
- Apply maximum widths to long-form content when necessary to preserve comfortable reading lengths on large screens.
- Prevent flex and grid children from overflowing their containers. Use `min-width: 0` where necessary to allow content to shrink correctly.
- Allow text, buttons, navigation, and other components to wrap or reflow when space is limited.
- Avoid hardcoded heights for content-driven containers unless the design specifically requires them.
- Do not use absolute positioning as the primary layout mechanism when normal document flow, Grid, or Flexbox would be more robust.
- Ensure spacing, alignment, and component dimensions remain coherent across different screen sizes.

### Responsive Images and Media

- Make images scale within their containers without exceeding their intrinsic dimensions.
- Use the following default pattern for fluid images when appropriate:```
  img {
    max-width: 100%;
    height: auto;
  }
  ```
- Avoid fixed image widths that cause overflow on small screens.
- Preserve image aspect ratios unless intentional cropping is part of the design.
- Use `object-fit` and `object-position` when appropriate to control image presentation within constrained containers.
- Use responsive image techniques such as `srcset`, `sizes`, and the `picture` element when different resolutions, crops, or formats are needed.
- Provide suitable intrinsic dimensions or aspect ratios to reduce layout shifts while images load.
- Ensure videos, embedded content, charts, and other media fit within their containers.
- Consider loading performance and avoid downloading unnecessarily large assets for small display areas.

### Responsive Typography

- Use readable base font sizes, appropriate line heights, and sufficient contrast across supported screen sizes.
- Prefer scalable units such as `rem` for typography and spacing where appropriate.
- Use responsive typography techniques to adjust headings and text as available space changes.
- Use `clamp()` or a combination of relative and viewport units to create fluid type scales when appropriate.
- Do not size text using viewport units alone, because doing so can limit users' ability to zoom text effectively.
- For example, use a bounded, scalable heading size:```
  h1 {
    font-size: clamp(1.75rem, 1.25rem + 2vw, 3rem);
  }
  ```
- Avoid excessively long text lines on large displays and excessively cramped text on narrow displays.
- Allow text to wrap naturally. Use overflow-handling techniques only when they preserve readability and access to the full content.
- Ensure text remains legible when users zoom in or increase their browser's default font size.

### Viewport and Browser Support

- Include the viewport meta tag in the HTML document's `<head>`:```
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ```
- Do not disable user zoom or impose viewport settings that prevent users from enlarging content.
- Use modern CSS features supported by the project's target browsers.
- Provide sensible fallbacks when a required feature is not supported by the project's browser targets.
- Avoid browser or device detection when responsive CSS and feature detection can solve the problem more reliably.
- Use media features such as `prefers-reduced-motion` and pointer capabilities when they meaningfully improve accessibility or interaction.
- Keep responsive behavior compatible with the existing framework and styling architecture.

### Responsive Accessibility and Interaction

- Ensure interactive elements remain visible, operable, and understandable at every supported viewport size.
- Provide touch targets with adequate size and spacing for touch-based interaction.
- Do not rely exclusively on hover to expose essential content or functionality.
- Preserve keyboard navigation, visible focus indicators, semantic HTML, and accessible names.
- Ensure responsive navigation remains accessible to keyboard and assistive-technology users.
- Avoid layouts that obscure content when the on-screen keyboard appears or when users zoom.
- Respect reduced-motion preferences when using responsive transitions or animations.
- Maintain adequate color contrast, readable text, and clear visual hierarchy across layouts.
- Ensure forms, validation messages, dialogs, tables, and other complex components remain usable on narrow screens.
- Prefer responsive reflow over horizontal scrolling. Allow horizontal scrolling only for content that genuinely requires a two-dimensional presentation, such as certain data tables, and provide a usable alternative where practical.

### Responsive Testing and Verification

- Verify layouts at narrow, medium, and wide viewport widths.
- Test both portrait and landscape orientations where relevant.
- Inspect components for horizontal overflow, clipped content, overlapping elements, awkward text wrapping, and unusable controls.
- Test keyboard navigation, touch interactions, browser zoom, and accessibility behavior.
- Verify that images and embedded media scale correctly.
- Test responsive behavior with realistic content, including long labels, large text, empty states, and error messages.
- Use browser developer tools and automated visual or accessibility tests where available.
- Fix the underlying layout constraints rather than adding isolated overrides that only work at one viewport width.
- Recheck existing layouts after changing shared styles, typography, spacing, or reusable components.

## Agent Execution and Code Review Rules

- Read the existing project instructions, relevant source files, and configuration before making changes.
- Follow repository-specific conventions unless they conflict with explicit requirements or necessary correctness and security safeguards.
- Prefer the smallest coherent change that satisfies the requested behavior.
- Reuse existing components, utilities, types, and dependencies before creating replacements.
- Do not add dependencies, introduce architectural changes, or refactor unrelated code without a clear justification.
- Preserve existing functionality and public contracts unless a change is explicitly requested.
- Validate assumptions about API behavior, data shapes, and external integrations rather than relying on unverified assumptions.
- Do not hardcode secrets, credentials, environment-specific values, or sensitive information.
- Handle errors explicitly and avoid silently ignoring failures.
- Add or update automated tests when behavior changes or when a regression risk warrants additional coverage.
- Run the relevant tests, type checks, linting, and build commands available in the project.
- Review the final diff for unnecessary complexity, duplicated logic, unclear naming, unsafe typing, accessibility problems, and responsive layout regressions.
- Report what changed, what validation was performed, and any known limitations or unverified behavior.
- If a requirement conflicts with existing architecture, explain the trade-off and choose the simplest maintainable solution that satisfies the requirement.
- Always leave a newline at the end of the file.

## Definition of Done

A change is complete when all applicable criteria are satisfied:

- [ ]The requested functionality is implemented correctly.
- [ ]The code follows SOLID and DRY principles without unnecessary abstractions.
- [ ]Variables, functions, methods, classes, and types have descriptive names.
- [ ]Methods and classes are self-documenting, with additional documentation for non-obvious behavior and public contracts.
- [ ]TypeScript types are accurate, and unsafe use of `any` or type assertions has been avoided.
- [ ]Relevant compiler checks, tests, linting, and build validation have been performed.
- [ ]Web interfaces adapt to supported viewport sizes and remain usable and accessible.
- [ ]Existing functionality and public contracts remain intact unless intentionally changed.
- [ ]No unrelated changes, unnecessary dependencies, or avoidable duplicated logic have been introduced.
- [ ]The final change summary accurately describes the implementation and validation results.