class Schema {
  constructor(definition) {
    this.definition = definition;
  }
  validate(document) {
    const errors = [];
    for (const [key, rules] of Object.entries(this.definition)) {
      let value = document[key];
      if (rules.required && (value === undefined || value === null)) {
        errors.push(`${key} is required`);
      }

      if (value !== undefined && rules.type) {
        const expected = rules.type.name.toLowerCase();
        const currentType = typeof value;
        if (
          (expected === "String" && currentType !== "string") ||
          (expected === "Number" && currentType !== "number") ||
          (expected === "Boolean" && currentType !== "boolean")
        ) {
          errors.push(
            `${key} should be ${expected}, but received ${currentType}`
          );
        }
      }

      if (value === undefined && rules.default !== undefined) {
        document[key] =
          typeof rules.default === "function" ? rules.default() : rules.default;
      }

      if (rules.default && rules.required) {
        errors.push(`The default and required fields cannot be together`);
      }

      if (value !== undefined && value !== null && rules.type) {
        if (rules.type === Number) {
          const converted = Number(value);
          if (isNaN(converted)) {
            errors.push(`${key} should be a number, got "${value}"`);
          } else {
            document[key] = converted;
            value = converted;
          }
        } else if (rules.type === String) {
          document[key] = String(value);
          value = document[key];
        } else if (rules.type === Boolean) {
          document[key] = Boolean(value);
          value = document[key];
        }
      }

      if (rules.min != null && rules.type !== Number) {
        errors.push(
          `The "min" rule can only be used on Number types for field "${key}"`
        );
      }

      if (rules.max != null && rules.type !== Number) {
        errors.push(
          `The "max" rule can only be used on Number types for field "${key}"`
        );
      }

      if (rules.type === Number && value != null) {
        if (rules.min != null && value < rules.min) {
          errors.push(
            `The minimum value for field "${key}" is ${rules.min}, got ${value}`
          );
        }

        if (rules.max != null && value > rules.max) {
          errors.push(
            `The maximum value for field "${key}" is ${rules.max}, got ${value}`
          );
        }
      }

      if (errors.length > 0) throw new Error(errors.join(", "));

      return document;
    }
  }
}

module.exports = Schema;
