// Authentication Service - Demo-safe implementation
// Wraps protocol with user authentication

export interface User {
  userId: string;
  name: string;
  email: string;
  hashedPassword: string;
  createdAt: string;
}

export interface AuthSession {
  userId: string;
  name: string;
  email: string;
  loginTime: string;
}

// Simple hash for demo purposes (NOT production-grade)
function simpleHash(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

// Generate UUID v4
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export class AuthService {
  private static USERS_KEY = 'ayurnxt_users';
  private static SESSION_KEY = 'ayurnxt_session';

  // Register new user
  static register(name: string, email: string, password: string): { success: boolean; error?: string; userId?: string } {
    // Validate inputs
    if (!name || !email || !password) {
      return { success: false, error: 'All fields are required' };
    }

    if (password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    // Check if email already exists
    const users = this.getAllUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user
    const userId = generateUUID();
    const newUser: User = {
      userId,
      name,
      email: email.toLowerCase(),
      hashedPassword: simpleHash(password),
      createdAt: new Date().toISOString()
    };

    // Store user
    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    return { success: true, userId };
  }

  // Login user
  static login(email: string, password: string): { success: boolean; error?: string; user?: User } {
    const users = this.getAllUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    if (user.hashedPassword !== simpleHash(password)) {
      return { success: false, error: 'Invalid email or password' };
    }

    // Create session
    const session: AuthSession = {
      userId: user.userId,
      name: user.name,
      email: user.email,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));

    return { success: true, user };
  }

  // Logout user (clears session only, NOT therapy data)
  static logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
  }

  // Get current session
  static getSession(): AuthSession | null {
    const sessionData = localStorage.getItem(this.SESSION_KEY);
    if (!sessionData) return null;

    try {
      return JSON.parse(sessionData);
    } catch {
      return null;
    }
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return this.getSession() !== null;
  }

  // Get current user ID
  static getCurrentUserId(): string | null {
    const session = this.getSession();
    return session ? session.userId : null;
  }

  // Get all users (private helper)
  private static getAllUsers(): User[] {
    const usersData = localStorage.getItem(this.USERS_KEY);
    if (!usersData) return [];

    try {
      return JSON.parse(usersData);
    } catch {
      return [];
    }
  }
}
