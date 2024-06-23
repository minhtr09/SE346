export const parseEther = (amount: any) => {
    return parseFloat((amount as any)?.toString()) / 1e18
}
