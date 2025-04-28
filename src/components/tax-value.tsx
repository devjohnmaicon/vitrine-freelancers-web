export default function TaxValue({value}: { value: number }) {
    return (
        <>
            <div className="badge badge-outline badge-neutral">RS {value},00</div>
        </>
    );
}
