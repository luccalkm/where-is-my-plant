export function isPrime(n: number): boolean {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

export function nextPrime(n: number): number {
    let candidate = n + 1;
    while (!isPrime(candidate)) candidate++;
    return candidate;
}

export function xpForNextLevel(currentLevel: number): number {
    if (currentLevel === 1) return 50;
    return nextPrime(currentLevel) * 25;
}

export function totalXpForLevel(level: number): number {
    let xp = 0;
    for (let lvl = 1; lvl < level; lvl++) {
        xp += xpForNextLevel(lvl);
    }
    return xp;
}

export function getLevelByXp(xp: number): { level: number, progress: number, required: number } {
    let level = 1;
    let acc = 0;
    while (true) {
        const need = xpForNextLevel(level);
        if (xp < acc + need) {
            return {
                level,
                progress: xp - acc,
                required: need
            };
        }
        acc += need;
        level++;
    }
}
