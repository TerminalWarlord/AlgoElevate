

interface PlatformDetails {
    iconPath: string;
    altText: string
}

export default function getPlatformIcon(url: string): PlatformDetails {
    if (url.includes('geeksforgeeks')) {
        return {
            iconPath: '/icons/platforms/geeksforgeeks.svg',
            altText: "GeeksForGeeks"
        };
    }
    else if (url.includes('leetcode')) {
        return {
            iconPath: '/icons/platforms/leetcode.svg',
            altText: "LeetCode"
        };
    }
    else if (url.includes('codeforces')) {
        return {
            iconPath: '/icons/platforms/codeforces.svg',
            altText: "CodeForces"
        };
    }
    else if (url.includes('codechef')) {
        return {
            iconPath: '/icons/platforms/codechef.svg',
            altText: "CodeChef"
        };

    }
    return {
        iconPath: '/icons/platforms/atcoder.svg',
        altText: "AtCoder"
    };
}