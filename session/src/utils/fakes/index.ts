import crypto from 'crypto';
/**
 * Gera um id similar ao do uid dos documentos do firestore
 * @returns string
 */

export const generateId = (): string => (crypto.randomBytes(30).toString('base64').replace(/[^a-zA-Z0-9\s]/g, '')).substring(0, 28);