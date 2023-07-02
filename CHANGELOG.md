# Changelog

## 0.5.0

### New features

- Vector: Add `add()` method.

## 0.4.0

### BREAKING CHANGES

- Vector: Rename `Vector.zero` to `Vector.ZERO`.

### New features

- Transform: Add `rotationFromUpAndLook()`.
- Vector: Add `cross()` method and basis vectors `Vector.BASIS.X`, `.Y`, `.Z`.

## 0.3.0

### BREAKING CHANGES

- Vector: Rename `negate()` to `negated()`.
- Segment: Rename `centroid` property to `midpoint`.

### New features

- Vector: Add `length`, `lengthSquared`, and `normalized()`.

### Bug fixes

- Segment: Fix typing of `centroid` / `midpoint` (changed from Vector to Point).

## 0.2.0

- Polyline: Add `length` property.

## 0.1.1

- Fix build issue due to extraneous bin reference.

## 0.1.0

Initial release.
