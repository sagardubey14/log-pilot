module.exports = function validateLog(log) {
    const requiredFields = [
        'level',
        'message',
        'resourceId',
        'timestamp',
        'traceId',
        'spanId',
        'commit',
        'metadata',
    ];

    const expectedTypes = {
        level: 'string',
        message: 'string',
        resourceId: 'string',
        timestamp: 'string',
        traceId: 'string',
        spanId: 'string',
        commit: 'string',
        metadata: 'object'
    };

    const errors = [];

    for (const key of Object.keys(log)) {
        if (!requiredFields.includes(key)) {
            errors.push(`Unknown field: ${key}`);
        }
    }

    for (const field of requiredFields) {
        if (!(field in log)) {
            errors.push(`${field} is missing`);
            continue;
        }

        const actualType = typeof log[field];
        if (actualType !== expectedTypes[field]) {
            errors.push(`${field} must be a ${expectedTypes[field]}, got ${actualType}`);
        }
    }

    if ('metadata' in log) {
        const metadata = log.metadata;
        if (
            typeof metadata !== 'object' ||
            Array.isArray(metadata) ||
            metadata === null ||
            Object.keys(metadata).length === 0
        ) {
            errors.push('metadata must be a non-null, non-array object with at least one property');
        }
    }

    if (log.timestamp && typeof log.timestamp === 'string') {
        const date = new Date(log.timestamp);
        if (isNaN(date.getTime())) {
            errors.push('timestamp must be a valid ISO 8601 string');
        }
    }

    const validLevels = ['error', 'warn', 'info', 'debug'];
    if (log.level && typeof log.level === 'string' && !validLevels.includes(log.level)) {
        errors.push(`Invalid level: ${log.level}`);
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};
